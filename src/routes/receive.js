module.exports = function (app) {
	app.get('/receive', function (req, res) {
		res.render('receive', {
			transaction: 'fwf24q2tw4'
		});
	});
};
