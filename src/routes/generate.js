var mimelib = require("mimelib");

var bitcash = require('../lib/bitcash');

module.exports = function (app) {
	app.post('/begin', function (req, res) {
		var from = mimelib.parseAddresses(req.body.from);
		from = from[0].address;

		var to = mimelib.parseAddresses(req.body.to);
		to = to[0].address;

		var subject = req.body.subject;

		var amount = subject.match(/\$([\d,]+(\.\d*)?)/);

		if (amount === null || amount.length < 2) {
			console.log('received email without dollars', req.body.subject);
			return;
		} else {
			var cents = parseFloat(amount[1]) * 100;

			bitcash.makeTransaction({
				from: from,
				to: to,
				amount: cents,
				subject: subject
			}, function(err, id) {
				console.log('began transaction', id);
			});
		}

		res.send('okay');
	});
};
