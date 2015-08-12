var Peter = function() {
	var texture = PIXI.Texture.fromImage('../img/bunny.png');
	PIXI.Sprite.call(this, texture);

	this.anchor.x = this.anchor.y = 0.5;

};


Peter.constructor = Peter;
Peter.prototype = Object.create(PIXI.Sprite.prototype);


Peter.prototype.update = function() {

	this.rotation += 0.05;
    this.position.x += this.speedX;
    this.position.y += this.speedY;

};

