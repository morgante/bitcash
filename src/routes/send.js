var bitcash = require('../lib/bitcash');

module.exports = function (app) {
	app.get('/send/:id', function (req, res) {
		// bitcash.makeTransaction({
		// 	from: 'me@morgante.net',
		// 	to: 'morgante@cafe.com',
		// 	amount: 100
		// }, function(a, b) {
		// 	console.log('transaction', a, b);
		// });
	
		var id = req.params.id;

		res.render('send', {
			transaction: id
		});
	});
};
