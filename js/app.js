var App = function() {

	this.bunniesToAdd = 30;
	this.fallenBunnies = [];
	this.bunnies = [];
	this.gravity = 0.3;

	this.releaseInterval = 60 * 0.5;
	this.tick = 0;
	this.isGameOver = true;

	this.slider;

	this.maxX = window.innerWidth;
	this.maxY = window.innerHeight - 125;
	this.minX = 0;
	this.minY = 0;

	this.options = {
		backgroundColor : 0xCCCCCC
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
	this.startButton.drawRoundedRect(50, 300, 150, 75, 12);
	this.startButton.endFill();
	this.startButton.alpha = 0.7;
	this.startButton.interactive = true;

	this.startButtonText = new PIXI.Text('GO', this.format);
	this.startButtonText.anchor.x = this.startButtonText.anchor.y = 0.5;
	this.startButtonText.position.x = 125;
	this.startButtonText.position.y = 340;

	this.stage.addChild(this.startButton);
	this.stage.addChild(this.startButtonText);

	this.startButton.on('mouseover', this.fillOpacity.bind(this));

	this.startButton.on('mouseout', this.fadeOpacity.bind(this));

	this.startButton.on('mousedown', this.beginBunnyTick.bind(this));
};


App.prototype.fillOpacity = function(e) {
	e.target.alpha = 1;
};


App.prototype.fadeOpacity = function(e) {
	e.target.alpha = 0.7;
};


App.prototype.animate = function() {

	this.renderer.render(this.stage);
	if(this.slider) {
		this.slider.update();
	}


	for(var i = 0; i < this.fallenBunnies.length; i++)
	{
		var bunny = this.fallenBunnies[i];
		this.stage.removeChild(bunny);
		var index = this.bunnies.indexOf(bunny);
		this.bunnies.splice(index, 1);
	}

	this.fallenBunnies = [];

	if (this.animateBunnies) {

		window.addEventListener('keydown', function(e) {
			this.slider.handleKeyDown(e);
		}.bind(this), false);

		window.addEventListener('keyup', function(e) {
			this.slider.handleKeyUp(e);
		}.bind(this), false);

		this.startButton.clear();
		this.startButtonText.text = '';
		// this.slider.updatePosition();
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

				if(bunny.collisionCoolDown > 0) {
					bunny.collisionCoolDown -= 1;
				}
				else {

				    if (bunny.positionBottomRightY >= this.slider.positionTopLeftY) {

				        if ((bunny.positionTopLeftX >= this.slider.positionTopLeftX &&
				    		bunny.positionTopLeftX <= this.slider.positionBottomRightX) ||
				    		(bunny.positionBottomRightX >= this.slider.positionTopLeftX &&
				    		bunny.positionBottomRightX <= this.slider.positionBottomRightX)) {

								bunny.collisionCoolDown = 5;
				        		bunny.speedY *= -0.85;
								bunny.position.y = this.slider.positionTopLeftY - bunny.height * 0.5;

								// add some random
								if (Math.random() > 0.2) {
									bunny.speedY -= Math.random() * 6;
								}

				    		if (bunny.canScore === true) {
					    		// you saved the bunny! you go glen coco! +1 for you
								this.score += 2;
					    		this.scoreLabel.text = this.score;
					    		bunny.canScore = false;
								this.canScoreCheck();
				    		}

				    	} else if (bunny.position.y >= this.maxY) {

							// else remove that bunny, he fell through the cracks, you lose a point now :/
							this.score -= 1;
							this.scoreLabel.text = this.score;
				    		this.fallenBunnies.push(bunny);
							this.canScoreCheck();
				    	}
				  }
			}
		}
	}

	this.tick++;

	if (this.tick >= this.releaseInterval &&
		this.bunnies.length < this.bunniesToAdd &&
		this.isGameOver == false) {

		this.releaseAPeter();
		this.tick = 0;
	}

	requestAnimationFrame(this.animate.bind(this));

};


App.prototype.beginBunnyTick = function() {

	this.animateBunnies = true;
	this.isGameOver = false;
	this.addGameSlider();
}


App.prototype.addGameSlider = function() {

	this.slider = new Slider();

	this.slider.anchor.x = this.slider.anchor.y = 0.5;
	this.slider.position.x = window.innerWidth / 2;
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

App.prototype.canScoreCheck = function() {

	if (this.score >= 20 || this.score <= -10) {
		this.animateBunnies = false;

		for (var i = 0; i < this.bunniesToAdd.length; i++) {
			this.stage.removeChild(this.bunniesToAdd[i]);
		}

		if (this.score >= 20) {
			this.scoreLabel.text = "YOU WIN!";
			this.isGameOver = true;

			setTimeout(function() {
				this.clearStage();
			}.bind(this), 2000);

		} else if (this.score <= -10) {
			this.scoreLabel.text = "YOU LOSE!";
			this.isGameOver = true;

			setTimeout(function() {
				this.clearStage();
			}.bind(this), 2000);

		}

	}
};

App.prototype.clearStage = function() {

	for (var i = 0; i < this.bunnies.length; i++) {
		var bunny = this.bunnies[i];
		bunny.reset();
		this.stage.removeChild(bunny);
	}

	this.slider.reset();
	this.stage.removeChild(this.slider);
	this.score = 0;
	this.scoreLabel.text = "PLAY AGAIN?";

	this.addStartButton();

};

randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

randomCol = function() {
	return '0x' + Math.floor(Math.random()*16777215).toString(16);
}
