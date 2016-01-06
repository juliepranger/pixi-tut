var Slider = function() {
	var sliderTexture = new PIXI.Texture.fromImage('./img/slider.png');
	PIXI.Sprite.call(this, sliderTexture);

	this.initSliderPosition();

};

Slider.constructor = Slider;
Slider.prototype = Object.create(PIXI.Sprite.prototype);


Slider.prototype.initSliderPosition = function() {
	// this.positionX;
	this.movingLeft = false;
	this.movingRight = false;
	this.positionXChange = 10;
	this.interactive = true;

	// this.on('mousemove', this.handleMouseMove.bind(this));
	// this.on('keydown', this.handleKeyPress.bind(this));

};

//
// Slider.prototype.handleMouseMove = function(evt) {
// 	var newPosition = evt.data.getLocalPosition(this.parent);
// 	this.positionX = newPosition.x;
// 	this.updatePosition(this.positionX);
// };


Slider.prototype.handleKeyDown = function(e) {

	switch(e.keyCode)
    {
        //left
        case 37:
			this.movingLeft = true;
        break;

        //right
        case 39:
			this.movingRight = true;
        break;
    }

};


Slider.prototype.handleKeyUp = function(e) {

	switch(e.keyCode)
    {
        //left
        case 37:
			this.movingLeft = false;
        break;

        //right
        case 39:
			this.movingRight = false;
        break;
    }

};


Slider.prototype.update = function() {

	if(this.movingLeft) {
		this.position.x -= this.positionXChange;
	} else if (this.movingRight) {
		this.position.x += this.positionXChange;
	}

};


Slider.prototype.stopMoving = function() {
	this.interactive = false;
};


Slider.prototype.reset = function() {
	this.interactive = false;
	this.initSliderPosition();
};
