var Peter = function() {
	console.log(this);
	this.bunnyTexture = PIXI.Texture.fromImage('bunny.png');
	this.maxX = window.innerWidth;
	this.maxY = window.innerHeight;
	this.minX = 0;
	this.minY = 0;
	this.gravity = 0.3;

	this.init();
};



Peter.prototype.init = function() {
	
	this.bunny = new PIXI.Sprite(this.bunnyTexture);
	this.bunny.anchor.x = this.bunny.anchor.y = 0.5;
	this.bunny.position.x = this.randomInt(0, window.innerWidth);
	this.bunny.position.y = this.randomInt(0, window.innerHeight);
   	this.bunny.speedX = this.randomInt(-10, 10);
	this.bunny.speedY = this.randomInt(2, 5);

	this.animate();

};



Peter.prototype.animate = function() {

    
    // requestAnimationFrame(this.animate.bind(this));

	this.bunny.rotation += 0.05;
    this.bunny.position.x += this.bunny.speedX;
    this.bunny.position.y += this.bunny.speedY;
    this.bunny.speedY += this.gravity;

    console.log('THIS PETER: ', this.bunny);

	if (this.bunny.position.x > this.maxX) {
	    this.bunny.speedX *= -0.85;
	    this.bunny.position.x = this.maxX;
	}

    else if (this.bunny.position.x < 0) {
        this.bunny.speedX *= -0.85;
        this.bunny.position.x = 0;
    }

	if (this.bunny.position.y > this.maxY) {
        this.bunny.speedY *= -0.85;
        this.bunny.position.y = this.maxY;

		if (Math.random() > 0.2) {
			this.bunny.speedY -= Math.random() * 6;
		}
    }
    else if (this.bunny.position.y < 0) {
        this.bunny.speedY *= -0.85;
        this.bunny.position.y = 0;
    }

};

Peter.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

