import GS from './GameStrings';
import MM from './Mastermind';

const Game = (() => {
	var $container, $input, last, Mastermind;
	var globalActions = ['new game', 'really new game', 'help', 'status', 'look around'];

	function init (c, i) {
		$container = c;
		$input = i;

		newGame();
	}

	function newGame () {
		$container.empty();

		Mastermind = new MM();
		addMessage(GS.newGame);

		addListeners();
		focus();
	}

	function addListeners () {
		$(document.body).on('click', focus);
		$input.on('keydown', onInput);
	}

	function onInput (event) {
		if (event.keyCode === 13) {
			var msg = $input.val().trim();

			if (!msg) return;

			addMessage(msg, 'me', -100);

			parseInput(msg);
			last = msg;
			$input.val('');
		} else if (event.keyCode === 38 && last) {
			$input.val(last);
		} else if (event.keyCode === 40) {
			$input.val('');
		}
	}

	function parseInput (input) {
		var text = input.toLowerCase();

		if (globalActions.indexOf(text) > -1) {
			switch (text) {
				case 'new game':
					if (Mastermind.rightPosition === 4 || Mastermind.health < 1) {
						newGame();
					} else {
						addMessage(GS.aNewGame);
					}
					break;
				case 'really new game':
					addMessage(GS.reallyNewGame);
					setTimeout(newGame, 8000);
					break;
				case 'help':
					addMessage(GS.helpText);
					break;
				case 'look around':
				case 'status':
					addMessage(Mastermind.checkStatus() + ' Your Health is <span class="red">' + Mastermind.health + '</span>.');
					break;
			}
		} else if (text.indexOf('look at') > -1) {
			var item = text.replace('look at', '').trim();
			switch (item) {
				case 'board':
					addMessage(GS.lookAtBoard);
					break;
				case 'battery':
					addMessage(GS.lookAtBattery);
					break;
				case 'disk':
				case 'disks':
					addMessage(GS.lookAtDisks);
					break;
				case 'something':
					addMessage(GS.smartAss);
					break;
				default:
					addMessage(GS.notSomethingToLookAt);
					break;
			}
		} else if (text.indexOf('place') > -1) {
			var guess = text.replace('place', '').trim();
			addMessage(Mastermind.makeGuess(guess));
		} else {
			addMessage(GS.unrecognizedCommand);
		}
	}

	function addMessage (message, modifier, speed) {
		var $node = $('<span class="message" />');
		var ts = speed || -75;
		var msg;

		if (message instanceof Array) {
			msg = message;
		} else {
			msg = [message];
		}

		if (modifier) $node.addClass(modifier);

		$container.append($node);
		$node.typed({
			strings: msg,
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
