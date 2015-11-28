  // Ask for turtle's name and display it in the header
  var turtleName = bootbox.prompt("What is the turtle's name?", function(turtleName) {
    if (turtleName) {
      console.log(turtleName);
      $('.greeting').append('Help ' + turtleName + ' eat some Raspberries!');
    }
  });

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "graphics/background.png";

// Turtle image
var turtleReady = false;
var turtleImage = new Image();
turtleImage.onload = function () {
	turtleReady = true;
};
turtleImage.src = "graphics/turtle.png";

// Raspberry image
var raspberryReady = false;
var raspberryImage = new Image();
raspberryImage.onload = function () {
	raspberryReady = true;
};
raspberryImage.src = "graphics/raspberry.png";

// Game objects
var turtle = {
	speed: 256 // movement in pixels per second
};
var raspberry = {};
var raspberries = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the turtle eats a raspberry
var reset = function () {
	turtle.x = canvas.width / 2;
	turtle.y = canvas.height / 2;

	// Throw the raspberry somewhere on the screen randomly
	raspberry.x = 32 + (Math.random() * (canvas.width - 64));
	raspberry.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		turtle.y -= turtle.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		turtle.y += turtle.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		turtle.x -= turtle.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		turtle.x += turtle.speed * modifier;
	}

	// Are they touching?
	if (
		turtle.x <= (raspberry.x + 64) &&
		raspberry.x <= (turtle.x + 64) &&
		turtle.y <= (raspberry.y + 64) &&
		raspberry.y <= (turtle.y + 64)
	) {
		++raspberries;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (turtleReady) {
		ctx.drawImage(turtleImage, turtle.x, turtle.y);
	}

	if (raspberryReady) {
		ctx.drawImage(raspberryImage, raspberry.x, raspberry.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Raspberries Eaten: " + raspberries, 64, 64);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
//init();
