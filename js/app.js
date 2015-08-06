var App = function(Peter) {

	this.bunniesToAdd = 50;
	this.bunnies = [];

	this.releaseInterval = 60 * 0.5;
	this.tick = 0;

	this.options = {
		backgroundColor : 0xA2C7A2
	};

	this.stage = new PIXI.Container();

	this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, this.options);
	document.body.appendChild(this.renderer.view);

	this.init();
	this.animate();
};


App.prototype.init = function() {
	// this.tick++;

	// console.log('this.tick: ', this.tick);

	do {
		var bunny = new Peter();
		this.bunnies.push(bunny);
		this.stage.addChild(bunny);
	}
	while (this.bunnies.length < this.bunniesToAdd);

};


App.prototype.animate = function() {

	this.renderer.render(this.stage);	

    requestAnimationFrame(this.animate.bind(this));

	for (var i = 0; i < this.bunnies.length; i++) {
		var bunny = this.bunnies[i];
		bunny.update();
	}


};
