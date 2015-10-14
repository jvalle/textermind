import GS from './GameStrings';

export default function Mastermind (opts) {
	var options = opts || {};
	this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black'];
	this.difficulty = options.difficulty || 4;
	this.solution = [];
	this.rightPosition = 0;
	this.rightColor = 0;
	this.health = 100;

	for (var i = 0; i < this.difficulty; i++) {
		this.solution.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
	}
};

Mastermind.prototype.makeGuess = function (guess) {
	var guesses = guess.split(' ');
	var solutionCopy = this.solution.slice();

	if (guesses.length !== 4) return GS.placeFour;

	this.rightPosition = 0;
	this.rightColor = 0;

	// check for exact matches first
	for (var i = 0; i < this.solution.length; i++) {
		if (guesses[i] === solutionCopy[i]) {
			guesses[i] = null;
			solutionCopy[i] = null;
			this.rightPosition++;
		}
	}

	// then look for remaining correct colors
	for (var i = 0; i < this.solution.length; i++) {
		if (guesses[i]) {
			for (var j = 0; j < this.solution.length; j++) {
				if (guesses[i] === solutionCopy[j]) {
					this.rightColor++;
					solutionCopy[j] = null;
					break;
				}
			}
			this.health -= 5;
		}
	}

	if (this.rightPosition === 4) {
		return GS.youWin;
	} else {
		if (this.health < 1) {
			return GS.gameOver;
		}
		switch (this.rightPosition) {
			case 1:
				return GS.guessedOne + ' In addition, you guessed ' + this.rightColor + ' colors correctly. Your health has been reduced to <span class="red">' + this.health + '</span> from the shock.';
			case 2:
				return GS.guessedTwo + ' In addition, you guessed ' + this.rightColor + ' colors correctly. Your health has been reduced to <span class="red">' + this.health + '</span> from the shock.';
			case 3:
				return [GS.guessedThree[0], GS.guessedThree[1] + ' In addition, you guessed ' + this.rightColor + ' colors correctly. Your health has been reduced to <span class="red">' + this.health + '</span> from the shock.'];
			default:
				return 'The battery lights up and sparks fly as you\'re shocked so violently that your hair burns and you take a full piss into your pants. You managed to get none in the correct position. In addition, you guessed ' + this.rightColor + ' colors correctly. Your health has been reduced to <span class="red">' + this.health + '</span> from the shock.';
		}
	}
};

Mastermind.prototype.checkStatus = function () {
	// todo, status message based on last guess
	// switch (this.rightPosition) {
		// case 0:
			return GS.noneGuessed;
	// }
};
