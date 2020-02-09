var background = new rect(0, 0, 100, 100, "green");
var car = new imageObj(1, 1, "car.png");
car.Yv = 1;

function game() {
    updateAll();
    car.moveByVelocity();
}

var gameLoop = setInterval(game, 50);