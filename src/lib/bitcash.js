var bitcoin = require('bitcoinjs-lib');
var Firebase = require("firebase");
var btoa = require('btoa');

var firebase = new Firebase("https://blinding-heat-4116.firebaseio.com/");

exports.awesome = function() {
  return 'awesome';
};


exports.test = function() {
};

function makeUser(email) {
	firebase.child("users").child(btoa(email)).child("email").set(email);
}

exports.makeTransaction = function(data, cb) {
	var transaction = firebase.child("transactions").push({
		from: data.from,
		to: data.to,
		amount: data.amount, // amount in cents
		status: "new"
	});

	makeUser(data.from);
	makeUser(data.to);

	var id = transaction.name();

	cb(null, id);
};