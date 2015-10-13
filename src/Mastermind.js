import GS from './GameStrings';

export default function Mastermind (opts) {
	var options = opts || {};
	this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black'];
	this.difficulty = options.difficulty || 4;
	this.solution = [];
	this.gameState = 0;
	this.health = 100;

	for (var i = 0; i < this.difficulty; i++) {
		this.solution.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
	}

	console.log(this.solution);
};

Mastermind.prototype.makeGuess = function (guess) {
	var guesses = guess.split(' ');

	if (guesses.length !== 4) {
		return GS.placeFour;
	}

	guesses.forEach(function (disk, i) {
		if (this.solution.indexOf(disk) > -1) {
			if (this.solution.indexOf(disk) === i) {
				// we got one right, in the right position
				console.log('one right, right position');
			} else {
				// we got one right, in any position
				console.log('one right, wrong position');
			}
		} else {
			// wrong color
			console.log('we got one wrong');
			this.health -= 20;
		}
	}.bind(this));
};

Mastermind.prototype.checkStatus = function () {
	switch (this.gameState) {
		case 0:
			return GS.noneGuessed;
	}
};
