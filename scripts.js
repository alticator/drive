var background = new rect(0, 0, 100, 100, "green");
var car = new imageObj(50, 50, convertToPercent("width", 47) / 4, convertToPercent("height", 67) / 4, "car.png");
document.onkeydown = keyPress;

function keyPress(event) {
    if (event.key == "ArrowLeft") {
        car.Xv = -0.5;
    }
    else if (event.key == "ArrowRight") {
        car.Xv = 0.5;
    }
}

function game() {
    updateAll();
    car.moveByVelocity();
}

var gameLoop = setInterval(game, 20);