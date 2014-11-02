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

	function getBalance(address, cb) {
		$.ajax({
			url: 'https://api.chain.com/v2/bitcoin/addresses/' + address,
			data: {'api-key-id': chainApiKey},
			success: function(data) {
				cb(null, data[0].confirmed.balance);
			}
		});
	}

	function wait() {
		console.log('waiting now...');
	}

	function check(cb) {
		getBalance(user.address, function(err, balance) {
			if (balance < transaction.sitoshis) {
				alert('Sorry, you need to add more money to that wallet.')
			} else {
				wait();
			}
		});
	}

	function init() {
		tid = $('[data-transaction-id]').data('transaction-id');

		firebase.child("transactions").child(tid).once('value', function(snapshot) {
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

			check();
			return;

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