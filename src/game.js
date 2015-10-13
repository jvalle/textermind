import GS from './GameStrings';

const Game = (() => {
	var container, input;

    function init (c, i) {
    	container = c;
    	input = i;

    	newGame();
    }

	function newGame () {
		container.empty();

		container.typed({
			strings: GS.newGame
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
