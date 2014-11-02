var bitcash = require('../lib/bitcash');

module.exports = function (app) {
	app.get('/generate', function (req, res) {
		bitcash.makeTransaction({
			from: 'me@morgante.net',
			to: 'morgante@cafe.com',
			amount: 100
		}, function(err, id) {
			res.redirect('/send/' + id)
		});
		// res.send('new route');
	});
};
