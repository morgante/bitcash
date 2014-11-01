'use strict';

module.exports = function (app) {
	app.get('/send', function (req, res) {
		res.render('send', {
			man: 'Bob'
		});
	});
};
