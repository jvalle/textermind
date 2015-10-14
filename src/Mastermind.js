import GS from './GameStrings';

export default function Mastermind (opts) {
	var options = opts || {};
	this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black'];
	this.difficulty = options.difficulty || 4;
	this.solution = [];
	this.rightPosition = 0;
	this.rightColor = 0;
	this.health = 100; // todo i dont think health should be handled here

	for (var i = 0; i < this.difficulty; i++) {
		this.solution.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
	}
};

Mastermind.prototype.makeGuess = function (guesses) {
	var solutionCopy = this.solution.slice();

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

	return {
		correctPosition : this.rightPosition,
		correctColors   : this.rightColor
	};
};

Mastermind.prototype.checkStatus = function () {
	// todo, status message based on last guess
	// switch (this.rightPosition) {
		// case 0:
			return GS.noneGuessed;
	// }
};
