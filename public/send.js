(function($) {
	var chainApiKey = '7a5477bbe44e338f0e12b7a389dc10ce';

	var firebase = new Firebase("https://blinding-heat-4116.firebaseio.com/");

	var user;
	var uid;
	var transaction;

	var tid;
	var key;

	var $form;
	var $address;
	var $wait;

	function check() {
		// debugger;
		console.log(user);
	}

	function init() {
		tid = $('[data-transaction-id]').data('transaction-id');

		firebase.child("transactions").child(tid).on('value', function(snapshot) {
			transaction = snapshot.val();
			uid = btoa(transaction.from);

			firebase.child("users").child(uid).on('value', function(snapshot) {
				user = snapshot.val();
			});
		});

		$form = $('form');
		$wif = $('#wif');

		$form.submit(function(evt) {
			evt.preventDefault();

			var wif = $wif.val();

			key = Bitcoin.ECKey.fromWIF(wif);

			var address = key.pub.getAddress().toString();
			
			firebase.child("users").child(uid).child("address").set(address);
			firebase.child("users").child(uid).child("key").set(wif);

			check();
		});
	}

	$(init);
})(jQuery, undefined);