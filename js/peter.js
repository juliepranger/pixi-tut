var Peter = function() {
	var texture = PIXI.Texture.fromImage('../img/bunny.png');
	
	PIXI.Sprite.call(this, texture);
console.log(this);
	this.maxX = window.innerWidth;
	this.maxY = window.innerHeight;
	this.minX = 0;
	this.minY = 0;
	this.gravity = 0.3;

	this.init();
};


Peter.constructor = Peter;
Peter.prototype = Object.create(PIXI.Sprite.prototype);

Peter.prototype.init = function() {
	
	this.anchor.x = this.anchor.y = 0.5;
	this.position.x = this.randomInt(0, window.innerWidth);
	this.position.y = this.randomInt(0, window.innerHeight);
   	this.speedX = this.randomInt(-10, 10);
	this.speedY = this.randomInt(2, 5);

};

Peter.prototype.update = function() {

	this.rotation += 0.05;
    this.position.x += this.speedX;
    this.position.y += this.speedY;
    this.speedY += this.gravity;

	if (this.position.x > this.maxX) {
	    this.speedX *= -0.85;
	    this.position.x = this.maxX;
	}

    else if (this.position.x < 0) {
        this.speedX *= -0.85;
        this.position.x = 0;
    }

	if (this.position.y > this.maxY) {
        this.speedY *= -0.85;
        this.position.y = this.maxY;

		if (Math.random() > 0.2) {
			this.speedY -= Math.random() * 6;
		}
    }
    else if (this.position.y < 0) {
        this.speedY *= -0.85;
        this.position.y = 0;
    }
};


Peter.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
