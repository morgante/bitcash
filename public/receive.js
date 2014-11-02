(function($) {
	var chainApiKey = '7a5477bbe44e338f0e12b7a389dc10ce';

	var firebase = new Firebase("https://blinding-heat-4116.firebaseio.com/");

	var users = firebase.child("users");
	var email = 'me@morgante';
	var userRef = users.child(btoa(email));
	var user;

	var tid;

	var $form;
	var $address;
	var $wait;

	function wait() {
		$wait = $('.waiting');

		$form.slideUp();
		$wait.slideDown();

		debugger;
		console.log(user);
	}

	function init() {
		tid = $('[data-transaction-id]').data('transaction-id');

		userRef.on('value', function(snapshot) {
			user = snapshot.val();
		});

		$form = $('form');
		$address = $('#address');

		$form.submit(function(evt) {
			evt.preventDefault();

			var address = $address.val();

			userRef.set({
				address: address
			});

			wait();
		});
	}

	$(init);
})(jQuery, undefined);