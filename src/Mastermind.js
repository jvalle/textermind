import GS from './GameStrings';

export default function Mastermind (opts) {
	var options = opts || {};
	this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black'];
	this.difficulty = options.difficulty || 4;
	this.solution = [];
	this.gameState = 0;

	for (var i = 0; i < this.difficulty; i++) {
		this.solution.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
	}

	console.log(this.solution);
};

Mastermind.prototype.makeGuess = function (guess) {

};

Mastermind.prototype.checkStatus = function () {
	switch (this.gameState) {
		case 0:
			return GS.noneGuessed;
	}
};
