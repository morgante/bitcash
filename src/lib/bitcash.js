var bitcoin = require('bitcoinjs-lib');
var Firebase = require("firebase");
var btoa = require('btoa');
var request = require('request');

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

		cb(null, id);
	});
};