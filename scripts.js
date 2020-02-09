var canvas = document.getElementById("viewport");
var aspectRatio = [2, 1];
var viewportWidth;
var viewportHeight;
var aspectRatioOne = aspectRatio[0];
var aspectRatioTwo = aspectRatio[1];
viewportWidth = window.innerWidth;
viewportHeight = aspectRatio[1] / aspectRatio[0] * viewportWidth;
while (viewportHeight > window.innerHeight) {
    viewportWidth = viewportWidth / 1.05;
    viewportHeight = viewportHeight / 1.05;
}
canvas.width = viewportWidth;
canvas.height = viewportHeight;
var ctx = canvas.getContext("2d");
var objects = [];

var magentaGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
magentaGradient.addColorStop(0, "magenta");
magentaGradient.addColorStop(1, "blue");

var magentaGradientTwo = ctx.createLinearGradient(200, 0, 200, 600);
magentaGradientTwo.addColorStop(0, "magenta");
magentaGradientTwo.addColorStop(1, "#00D0FF");

function clearAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function rect(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.growXv = 0;
	this.growYv = 0;
	this.Xv = 0;
	this.Yv = 0;
	this.update =  function() {
		ctx.fillStyle = this.color;
        this.pixelX = x * (canvas.width / 100);
        this.pixelY = y * (canvas.height / 100);
        this.pixelWidth = width * (canvas.width / 100);
        this.pixelHeight = height * (canvas.height / 100);
		ctx.fillRect(this.pixelX, this.pixelY, this.pixelWidth, this.pixelHeight);
	}
	this.moveByVelocity = function() {
		this.Xv += this.growXv;
		this.Yv += this.growYv;
		this.x += this.Xv;
		this.y += this.Yv;
	}
	objects.push(this);
}

function circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.growXv = 0;
	this.growYv = 0;
	this.Xv = 0;
	this.Yv = 0;
	this.update =  function() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
        this.pixelX = x * (canvas.width / 100);
        this.pixelY = y * (canvas.height / 100);
        this.pixelRadius = radius * (canvas.height / 100);
		ctx.arc(this.pixelX, this.pixelY, this.pixelRadius, 0, 2 * Math.PI);
		ctx.fill();
	}
	this.moveByVelocity = function() {
		this.Xv += this.growXv;
		this.Yv += this.growYv;
		this.x += this.Xv;
		this.y += this.Yv;
	}
	objects.push(this);
}

function textObj(string, x, y, font, color, textAlign) {
	this.x = x;
	this.y = y;
	this.font = font;
	this.color = color;
	this.textAlign = textAlign;
	this.string = string;
	this.growXv = 0;
	this.growYv = 0;
	this.Xv = 0;
	this.Yv = 0;
	this.update = function() {
		ctx.font = this.font;
		ctx.textAlign = this.textAlign;
		ctx.fillStyle = this.color;
        this.pixelX = x * (canvas.width / 100);
        this.pixelY = y * (canvas.height / 100);
		ctx.fillText(this.string, this.pixelX, this.pixelY);
	}
	this.moveByVelocity = function() {
		this.Xv += this.growXv;
		this.Yv += this.growYv;
		this.x += this.Xv;
		this.y += this.Yv;
	}
	objects.push(this);
}

function imageObj(x, y, src) {
	this.x = x;
	this.y = y;
	this.src = src;
	this.growXv = 0;
	this.growYv = 0;
	this.Xv = 0;
	this.Yv = 0;
    this.image = new Image();
    this.image.src = this.src;
	this.update = function() {  
        ctx.drawImage(this.image, this.x, this.y);
	}
	this.moveByVelocity = function() {
		this.Xv += this.growXv;
		this.Yv += this.growYv;
		this.x += this.Xv;
		this.y += this.Yv;
	}
	objects.push(this);
}

function updateAll() {
	clearAll();
	for (var i = 0; i < objects.length; i++) {
		objects[i].update();
	}
}

function inside(x, y, object) {
    console.log("Running");
    if (x > object.x && y > object.y && x < object.x + object.width && y < object.y + object.height) {
        return true;
    }
    else {
        return false;
    }
}

function convertToPercent(type, number) {
    if (type == "width") {
        return number / canvas.width * 100;
    }
    else if (type == "height") {
        return number / canvas.height * 100;
    }
}

new rect(0, 0, 100, 100, "black");

function game() {
    updateAll();
}

var gameLoop = setInterval(game, 50);