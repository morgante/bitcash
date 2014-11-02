(function($) {
	var chainApiKey = '7a5477bbe44e338f0e12b7a389dc10ce';

	var firebase = new Firebase("https://blinding-heat-4116.firebaseio.com/");

	var user;
	var uid;
	var transaction;

	var tid;

	var $form;
	var $address;
	var $wait;

	function wait() {
		$wait = $('.waiting');

		$form.slideUp();
		$wait.slideDown();

		// debugger;
		console.log(user);
	}

	function init() {
		tid = $('[data-transaction-id]').data('transaction-id');

		var $dollars = $('[data-show="dollars"]');

		firebase.child("transactions").child(tid).on('value', function(snapshot) {
			transaction = snapshot.val();
			uid = btoa(transaction.to);

			$dollars.text('$' + transaction.cents / 100);

			firebase.child("users").child(uid).on('value', function(snapshot) {
				user = snapshot.val();
			});
		});

		$form = $('form');
		$address = $('#address');

		$form.submit(function(evt) {
			evt.preventDefault();

			var address = $address.val();

			firebase.child("users").child(uid).child("address").set(address);

			wait();
		});
	}

	$(init);
})(jQuery, undefined);