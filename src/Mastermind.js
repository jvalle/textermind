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
	console.log(this.solution);
};

Mastermind.prototype.makeGuess = function (guess) {
	var guesses = guess.split(' ');

	if (guesses.length !== 4) return GS.placeFour;

	this.rightPosition = 0;
	this.rightColor = 0;

	guesses.forEach(function (disk, i) {
		if (this.solution.indexOf(disk) > -1) {
			if (this.solution[i] === disk) {
				// we got one right, in the right position
				this.rightPosition++;
			} else {
				// we got one right, in any position
				this.rightColor++;
			}
		} else {
			// wrong guess
			this.health -= 10;
		}
	}.bind(this));

	if (this.rightPosition === 4) {
		return GS.youWin;
	} else {
		// todo, different message based on accuracy of guesses
		return 'The battery sparks and you are electrocuted violently shaking you from head to toe.  You pee yourself a little. Looks like you guessed ' + this.rightColor + ' correct, with ' + this.rightPosition + ' being in the correct position.  Your health has been reduced to ' + this.health + ' from the shock.';
	}
};

Mastermind.prototype.checkStatus = function () {
	// todo, status message based on last guess
	switch (this.rightPosition) {
		case 0:
			return GS.noneGuessed;
	}
};
