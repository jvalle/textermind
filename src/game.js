

const Game = ((opts) => {
    const options  = opts || {};

    function init (canvas) {

    }

	function newGame () {
		while (c.firstChild) {
			c.removeChild(c.firstChild);
		}

	}


    return {
        init: init
    };

})();

window.Game = Game;
