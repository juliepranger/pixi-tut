var Slider = function() {
	var sliderTexture = new PIXI.Texture.fromImage('../img/slider.png');
	PIXI.Sprite.call(this, sliderTexture);

	this.initSliderPosition();

};

Slider.constructor = Slider;
Slider.prototype = Object.create(PIXI.Sprite.prototype);


Slider.prototype.initSliderPosition = function() {

	this.positionX;
	this.interactive = true;

	this.on('mousemove', this.handleMouseMove.bind(this));

};


Slider.prototype.handleMouseMove = function(evt) {
	var newPosition = evt.data.getLocalPosition(this.parent);

	this.positionX = newPosition.x;

	this.updatePosition(this.positionX);
};

Slider.prototype.updatePosition = function(x) {
	this.position.x = this.positionX;
};