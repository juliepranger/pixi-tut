var App = function() {

	this.bunniesToAdd = 30;
	this.chances = 5;
	this.fallenBunnies = [];
	this.bunnies = [];
	this.gravity = 0.3;

	this.releaseInterval = 60 * 0.5;
	this.tick = 0;

	this.slider;

	this.maxX = window.innerWidth;
	this.maxY = window.innerHeight - 125;
	this.minX = 0;
	this.minY = 0;

	this.options = {
		backgroundColor : 0xA2C7A2
	};

	this.animateBunnies = false;
	this.interactive = true;
	this.startButton;
	this.startButtonText;

	this.format = {
		fill: "#ababab",
		font: "24px Arial",
		align: "center"
	};

	this.scoreFormat = {
		fill: "black",
		font: "24px Arial",
		align: "center"
	};

	this.canScore = false;
	this.score = 0;
	this.scoreLabel = new PIXI.Text("", this.scoreFormat);
	this.scoreLabel.position.x = 50;
	this.scoreLabel.position.y = 100;

	this.initPixi();
	this.animate();
};

App.constructor = App;

App.prototype.initPixi = function() {

	this.stage = new PIXI.Container();

	this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, this.options);

	document.body.appendChild(this.renderer.view);

	this.addStartButton();
};


App.prototype.addStartButton = function() {
	this.startButton = new PIXI.Graphics();
	this.startButton.beginFill(0xFFFFFF);
	this.startButton.drawRoundedRect(500, 500, 150, 75, 12);
	this.startButton.endFill();
	this.startButton.alpha = 0.7;
	this.startButton.interactive = true;

	this.startButtonText = new PIXI.Text('GO', this.format);
	this.startButtonText.anchor.x = this.startButtonText.anchor.y = 0.5;
	this.startButtonText.position.x = 575;
	this.startButtonText.position.y = 540;

	this.stage.addChild(this.startButton);
	this.stage.addChild(this.startButtonText);

	this.startButton.on('mousedown', this.beginBunnyTick.bind(this));
}

App.prototype.animate = function() {

	this.renderer.render(this.stage);

	for(var i = 0; i < this.fallenBunnies.length; i++)
	{
		var bunny = this.fallenBunnies[i];
		this.stage.removeChild(bunny);
		var index = this.bunnies.indexOf(bunny);
		this.bunnies.splice(index, 1);
	}

	this.fallenBunnies = [];

	if (this.animateBunnies) {

		this.startButton.clear();
		this.startButtonText.text = '';

		this.slider.updatePosition();
		var sliderBounds = this.slider.getBounds();

		// find multiple positions for slider
		this.slider.positionTopLeftX = sliderBounds.x;
		this.slider.positionTopLeftY = sliderBounds.y;
		this.slider.positionBottomRightX = sliderBounds.x + sliderBounds.width;
		this.slider.positionBottomRightY = sliderBounds.y + sliderBounds.height;

		for (var i = 0; i < this.bunnies.length; i++) {
			var bunny = this.bunnies[i];
			bunny.update();

			var bunnyBounds = bunny.getBounds();

			// find multiple positions for each bunny
			bunny.positionTopLeftX = bunnyBounds.x;
			bunny.positionTopLeftY = bunnyBounds.y;
			bunny.positionBottomRightX = bunnyBounds.x + bunnyBounds.width;
			bunny.positionBottomRightY = bunnyBounds.y + bunnyBounds.height;

			bunny.speedY += this.gravity;

			if (bunny.position.x > this.maxX) {
			    bunny.speedX *= -0.85;
			    bunny.position.x = this.maxX;
			}

		    else if (bunny.position.x < 0) {
		        bunny.speedX *= -0.85;
		        bunny.position.x = 0;
		    }

		    else if (bunny.position.y < 0) {
		        bunny.speedY *= -0.85;
		        bunny.position.y = 0;
		    }


				// We have added a cool-down to each bunny so we can give it time to move away from the
				// collision bounds.
				// Without some cool-down time, the sprite must move outside of the bounds of the slider
				// within only one frame. Thus is remains at the bounds line, as it is classed as 'always colliding'.

				if(bunny.collisionCoolDown > 0)
				{
					bunny.collisionCoolDown -= 1;
				}
				else
				{

			    if (bunny.positionBottomRightY >= this.slider.positionTopLeftY) {

			    	if ((bunny.positionTopLeftX >= this.slider.positionTopLeftX &&
			    		bunny.positionTopLeftX <= this.slider.positionBottomRightX) ||
			    		(bunny.positionBottomRightX >= this.slider.positionTopLeftX &&
			    		bunny.positionBottomRightX <= this.slider.positionBottomRightX)) {

			    		// this.canScoreCheck();

							bunny.collisionCoolDown = 5;
			        bunny.speedY *= -0.85;
							bunny.position.y = this.slider.positionTopLeftY - bunny.height * 0.5;

							// add some random
							if (Math.random() > 0.2) {
								bunny.speedY -= Math.random() * 6;
							}

			    		if (bunny.canScore === true) {
			    			console.log('can score now!');
				    		// you saved the bunny! you go glen coco! +1 for you
								this.score += 1;
				    		this.scoreLabel.text = this.score;
				    		bunny.canScore = false;
			    		}

			    	} else if (bunny.position.y >= this.maxY) {

			    		// this.canScoreCheck();
						// else remove that bunny, he fell through the cracks, you lose a point now :/
						this.score -= 1;
						this.scoreLabel.text = this.score;
						this.chances--;

			    		console.log('BUNNY DOWN');
			    		this.fallenBunnies.push(bunny);
			    		console.log('fallen bunnies: ', this.fallenBunnies.length);
			    	}
			    }
				}
		}

		// console.log('this.fallenBunnies:', this.fallenBunnies);

		// needs to be if the fallenBunnies == this.bunniesToAdd --> no more bunnies to save!

	}

	this.tick++;

	if (this.tick >= this.releaseInterval && this.bunnies.length < this.bunniesToAdd) {

		this.releaseAPeter();
		this.tick = 0;
	}

	requestAnimationFrame(this.animate.bind(this));

};


App.prototype.beginBunnyTick = function() {

	this.animateBunnies = true;

	this.addGameSlider();
}


App.prototype.addGameSlider = function() {

	this.slider = new Slider();

	this.slider.anchor.x = this.slider.anchor.y = 0.5;
	this.slider.position.y = window.innerHeight - 100;
	this.slider.position.z = 101;
	this.stage.addChild(this.slider);
	this.stage.addChild(this.scoreLabel);
};


App.prototype.releaseAPeter = function() {

	var bunny = new Peter();
			bunny.position.x = randomInt(0, window.innerWidth);
			bunny.position.y = randomInt(0, window.innerHeight / 4);
		  bunny.speedX = randomInt(-10, 10);
			bunny.speedY = randomInt(2, 5);
			bunny.tint = randomCol();
			bunny.canScore = true;

	this.bunnies.push(bunny);
	this.stage.addChild(bunny);
};

// App.prototype.canScoreCheck = function() {
// 	var self = this;


// 	setTimeout(function() {
// 		self.canScore = true;
// 	}, this.releaseInterval / this.bunniesToAdd);
// };


randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

randomCol = function() {
	return '0x' + Math.floor(Math.random()*16777215).toString(16);
}
