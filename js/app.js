var App = function() {

	// this.bunniesToAdd = 50;
	this.bunnies = [];
	this.gravity = 0.3;

	this.releaseInterval = 60 * 0.5;
	this.tick = 0;

	this.maxX = window.innerWidth;
	this.maxY = window.innerHeight;
	this.minX = 0;
	this.minY = 0;

	this.options = {
		backgroundColor : 0xA2C7A2
	};

	this.initPixi();
	this.animate();
};

App.constructor = App;

App.prototype.initPixi = function() {

	this.stage = new PIXI.Container();

	this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, this.options);
	document.body.appendChild(this.renderer.view);

};


App.prototype.animate = function() {

	this.renderer.render(this.stage);

    requestAnimationFrame(this.animate.bind(this));


	for (var i = 0; i < this.bunnies.length; i++) {
		var bunny = this.bunnies[i];
		bunny.update();

		bunny.speedY += this.gravity;

		if (bunny.position.x > this.maxX) {
		    bunny.speedX *= -0.85;
		    bunny.position.x = this.maxX;
		}

	    else if (bunny.position.x < 0) {
	        bunny.speedX *= -0.85;
	        bunny.position.x = 0;
	    }

		if (bunny.position.y > this.maxY) {
	        bunny.speedY *= -0.85;
	        bunny.position.y = this.maxY;

			if (Math.random() > 0.2) {
				bunny.speedY -= Math.random() * 6;
			}
	    }
	    else if (bunny.position.y < 0) {
	        bunny.speedY *= -0.85;
	        bunny.position.y = 0;
	    }
	}

	this.tick++;
	this.colorTick++;

	if (this.tick === this.releaseInterval) {
		
		this.releaseAPeter();
		this.tick = 0;
	}

};


App.prototype.releaseAPeter = function() {		

		var bunny = new Peter();
			bunny.position.x = randomInt(0, window.innerWidth);
			bunny.position.y = randomInt(0, window.innerHeight);
		   	bunny.speedX = randomInt(-10, 10);
			bunny.speedY = randomInt(2, 5);
			bunny.tint = randomCol();


		this.bunnies.push(bunny);
		this.stage.addChild(bunny);	
};


randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

randomCol = function() {
	return '0x' + Math.floor(Math.random()*16777215).toString(16);
}
