import GS from './GameStrings';
import MM from './Mastermind';

const Game = (() => {
	var $container, $input, Mastermind;
	var globalActions = ['new game', 'help', 'status'];

    function init (c, i) {
    	$container = c;
    	$input = i;

    	newGame();
    }

	function newGame () {
		$container.empty();

		addListeners();

		addMessage(GS.newGame);

		Mastermind = new MM();

		focus();
	}

	function addListeners () {
		$(document.body).on('click', focus);
		$input.on('keypress', onInput);
	}

	function onInput (event) {
		if (event.keyCode === 13) {
			var msg = $input.val().trim();

			if (!msg) return;

			addMessage(msg, 'me', -100);

			parseInput(msg);

			$input.val('');
		}
	}

	function parseInput (input) {
		var text = input.toLowerCase();

		if (globalActions.indexOf(text) > -1) {
			switch (text) {
				case 'new game':
					break;
				case 'help':
					addMessage(GS.helpText);
					break;
				case 'status':
					addMessage(Mastermind.checkStatus());
					break;
			}
		}
	}

	function addMessage (message, modifier, speed) {
		var $node = $('<span class="message" />');
		var ts = speed || -10;

		if (modifier) $node.addClass(modifier);

		$container.append($node);
		$node.typed({
			strings: [message],
			showCursor: false,
			typeSpeed: ts,
			preStringTyped: function () {
				$input.prop('disabled', true);
			},
			callback: function () {
				$container.scrollTop($container.get(0).scrollHeight);
				$input.prop('disabled', false);
				focus();
			}
		});
	}

	function focus () {
		$input.focus();
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
