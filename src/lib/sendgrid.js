var sendgrid  = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_SECRET);

function sentEmail(transaction) {
	var dollars = transaction.cents / 100;

	var payload = {
		to: transaction.from,
		from: 'cash@faceco.in',
		subject: 'Sent $' + dollars + ' to ' + transaction.to,
		text: 'We have successfully sent money to them.'
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
}

module.exports = {
	sendSuccess: sendSuccess
};