var sendgrid  = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_SECRET);

var base = 'http://bitcash.ngrok.com';

function sentEmail(transaction) {
	var dollars = transaction.cents / 100;

	var payload = {
		to: transaction.from,
		from: 'cash@faceco.in',
		subject: 'Re: ' + transaction.subject,
		text: 'We have successfully sent $' + dollars + ' to ' + transaction.to + '.'
	};
	sendgrid.send(payload, function(err, json) {
		if (err) {
			console.log('sendgrid err', err);
		} else {
			console.log('SR', json);
		}
	});
}

function receivedEmail(transaction) {
	var dollars = transaction.cents / 100;

	var payload = {
		to: transaction.to,
		from: 'cash@faceco.in',
		subject: 'Re: ' + transaction.subject,
		text: 'We have successfully deposited $' + dollars + ' from ' + transaction.from + ' into your wallet.'
	};
	sendgrid.send(payload, function(err, json) {
		if (err) {
			console.log('sendgrid err', err);
		} else {
			console.log('SR', json);
		}
	});
}

function sendSuccess(transaction) {
	sentEmail(transaction);
	receivedEmail(transaction);
}

function promptSender(transaction, sender) {
	var id = transaction.name();
	var data = transaction.val();

	var url = base + '/send/' + id;

	var payload = {
		to: data.from,
		from: 'cash@faceco.in',
		subject: 'Re: ' + data.subject,
		text: 'Almost ready to send your transaction. We just need a little info from you, here: ' + url
	};

	sendgrid.send(payload, function(err, json) {
		if (err) {
			console.log('sendgrid err', err);
		} else {
			console.log('SR', json);
		}
	});
}

function promptReceiver(transaction, sender) {
	var id = transaction.name();
	var data = transaction.val();

	var url = base + '/receive/' + id;

	var payload = {
		to: data.to,
		from: 'cash@faceco.in',
		subject: 'Re: ' + data.subject,
		text: data.from + ' is trying to send you money. We just need a little info from you, here: ' + url
	};

	sendgrid.send(payload, function(err, json) {
		if (err) {
			console.log('sendgrid err', err);
		} else {
			console.log('SR', json);
		}
	});
}

module.exports = {
	sendSuccess: sendSuccess,
	promptSender: promptSender,
	promptReceiver: promptReceiver
};