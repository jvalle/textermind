var colors = ['red', 'green', 'blue', 'yellow'];

export default function MasterMind (opts) {
	var options = opts || {};
	this.noCols = options.noColumns || 4;
	this.solution = [];

	for (var i = 0; i < this.noCols; i++) {
		this.solution.push(colors[Math.floor(Math.random() * this.noCols)]);
	}

	console.log(this.solution);
};