(function($) {
	var chainApiKey = '7a5477bbe44e338f0e12b7a389dc10ce';

	function getBalance(address, cb) {
		console.log('address', address);
		$.ajax({
			url: 'https://api.chain.com/v2/bitcoin/addresses/' + address,
			data: {'api-key-id': chainApiKey},
			success: function(data) {
				console.log('balance data', data);
			}
		});
	}

	function init() {
		getBalance('1Pxf8H2V9vjev7PpWixgqZqtCgtrwqtKeX', function(a, b) {
			console.log('a', a, b);
		});
	}

	$(init);
})(jQuery, undefined);