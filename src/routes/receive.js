var bitcash = require('../lib/bitcash');

module.exports = function (app) {
	// bitcash.makeTransaction({
	// 	from: 'me@morgante.net',
	// 	to: 'morgante@cafe.com',
	// 	amount: 100
	// }, function(a, b) {
	// 	console.log('transaction', a, b);
	// });

	app.get('/receive/:id', function (req, res) {
		var id = req.params.id;

		res.render('receive', {
			transaction: id
		});
	});
};
