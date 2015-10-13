import GS from './GameStrings';

const Game = (() => {
	var $container, $input;

    function init (c, i) {
    	$container = c;
    	$input = i;

    	newGame();
    }

	function newGame () {
		$container.empty();

		addListeners();

		addMessage(GS.newGame);
	}

	function addListeners () {
		$input.on('keypress', onInput);
	}

	function onInput (event) {
		if (event.keyCode === 13) {
			var msg = $input.val();

			if (!msg) return;

			addMessage(msg, 'me', -100);

			// parse message here

			$input.val('');
		}
	}

	function addMessage (message, modifier, speed) {
		var $node = $('<span class="message" />');
		var ts = speed || 0;

		if (modifier) $node.addClass(modifier);

		$container.append($node);
		$node.typed({
			strings: [message],
			showCursor: false,
			typeSpeed: ts,
			callback: function () {
				$container.scrollTop($container.get(0).scrollHeight);
			}
		});
	}

    return {
        init: init
    };

})();

$(function () {
	var $cont = $('#console');
	var $input = $('#input');

	Game.init($cont, $input);
});
