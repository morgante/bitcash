(function($) {
	var chainApiKey = '7a5477bbe44e338f0e12b7a389dc10ce';

	var firebase = new Firebase("https://blinding-heat-4116.firebaseio.com/");

	function init() {
		getBalance('1Pxf8H2V9vjev7PpWixgqZqtCgtrwqtKeX', function(a, b) {
			console.log('a', a, b);
		});
	}

	$(init);
})(jQuery, undefined);