var Peter = function() {
	var texture = new PIXI.Texture.fromImage('./img/bunny.png');
	PIXI.Sprite.call(this, texture);

	this.anchor.x = this.anchor.y = 0.5;

};


Peter.constructor = Peter;
Peter.prototype = Object.create(PIXI.Sprite.prototype);


Peter.prototype.update = function() {
    this.position.x += this.speedX;
    this.position.y += this.speedY;

};
