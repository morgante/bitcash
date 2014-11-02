var bitcoin = require('bitcoinjs-lib');
var Firebase = require("firebase");
var btoa = require('btoa');
var request = require('request');
var chain = require('chain-node');
var _ = require('lodash');

// testing
// chain.blockChain = 'testnet3';

var firebase = new Firebase("https://blinding-heat-4116.firebaseio.com/");

exports.awesome = function() {
  return 'awesome';
};


exports.test = function() {
};

exports.makeWallet = function() {
	var key = bitcoin.ECKey.makeRandom();

	// Print your private key (in WIF format)
	console.log(key.toWIF());

	// Print your public key (toString defaults to a Bitcoin address)
	console.log(key.pub.getAddress().toString());
};

function makeUser(email) {
	firebase.child("users").child(btoa(email)).child("email").set(email);
}

function centsToSitoshis(cents, cb) {
	var dollars = cents / 100;

	var url = 'https://blockchain.info/tobtc?currency=USD&value=' + dollars;

	request(url, function(err, res, body) {
		var sitoshis = parseFloat(body);

		if (err || body === null || isNaN(sitoshis)) {
			cb(err, null);
		} else {
			cb(null, sitoshis * 100000000);
		}
	});
}

var fee = 10000; // 30 cents...

function execute(transaction, from, to) {
	chain.getAddressUnspents(from.address, function(err, resp) {
		var unspent = _.find(resp, function(unspent) {
			return unspent.value > (transaction.sitoshis + fee);
		});

		console.log('tr', transaction, from, to, unspent, resp);

		if (unspent === undefined) {
			return;
		}

		var txn = new bitcoin.Transaction();

		txn.addInput(unspent.transaction_hash, unspent.output_index);

		txn.addOutput(to.address, transaction.sitoshis);

		// send back change
		txn.addOutput(from.address, unspent.value - transaction.sitoshis - fee);

		// sign it
		var key = new bitcoin.ECKey.fromWIF(from.key);
		console.log('from!', from.key, from.address);

		txn.sign(0, key);

		var hex = txn.toHex();

		chain.sendTransaction(hex, function(err, resp) {
			console.log('transacted', err, resp);
		});
	});
}

function readyCheck(tid) {
	firebase.child("transactions").child(tid).once("value", function(transaction) {
		transaction = transaction.val();

		firebase.child("users").child(btoa(transaction.from)).once("value", function(from) {
			from = from.val();
			firebase.child("users").child(btoa(transaction.to)).once("value", function(to) {
				to = to.val();

				console.log('eh', transaction, from, to);

				if (transaction.status === "new" && from.key !== undefined && to.address !== undefined) {
					execute(transaction, from, to);
					firebase.child("transactions").child(tid).child("status").set("ready");
				}
			});
		});
	});
}

exports.makeTransaction = function(data, cb) {
	centsToSitoshis(data.amount, function(err, sitoshis) {
		var transaction = firebase.child("transactions").push({
			from: data.from,
			to: data.to,
			sitoshis: sitoshis,
			cents: data.amount,
			status: "new"
		});
		
		makeUser(data.from);
		makeUser(data.to);

		var id = transaction.name();

		transaction.once("value", function(snapshot) {
			firebase.child("users").child(btoa(data.from)).on("value", function(us) {
				readyCheck(id);
			});
		});

		cb(null, id);
	});
};