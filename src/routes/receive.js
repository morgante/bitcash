var bitcash = require('../lib/bitcash');

module.exports = function (app) {
	// bitcash.makeWallet();
	
	app.get('/receive/:id', function (req, res) {
		// bitcash.makeTransaction({
		// 	from: 'me@morgante.net',
		// 	to: 'morgante@cafe.com',
		// 	amount: 100
		// }, function(a, b) {
		// 	console.log('transaction', a, b);
		// });
	
		var id = req.params.id;

		res.render('receive', {
			transaction: id
		});
	});
};
