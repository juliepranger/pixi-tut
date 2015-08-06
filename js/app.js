var App = function(Peter) {

	this.bunniesToAdd = 5;
	this.bunnies = [];
	this.bunny;

	this.releaseInterval = 60 * 0.5;
	this.tick = 0;

	this.options = {
		backgroundColor : 0xA2C7A2
	};

	this.stage = new PIXI.Container();

	this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, this.options);
	document.body.appendChild(this.renderer.view);

	this.init();
};


App.prototype.init = function() {
	var self = this;
	// this.tick++;

	// console.log('this.tick: ', this.tick);
	
	console.log('this.bunnies.length: ', this.bunnies.length);
	console.log('this.bunniesToAdd: ', this.bunniesToAdd);

	do {
		self.bunny = new Peter();
		self.bunnies.push(self.bunny);
		self.stage.addChild(self.bunny);
	}
	while (this.bunnies.length < this.bunniesToAdd);


	this.renderer.render(this.stage);	

};
