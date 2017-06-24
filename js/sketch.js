var staticCircle;
var movingCircle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  staticCircle = new Circle(width / 2, height / 2, 150, width / 2, height / 2);
  movingCircle = new Circle(width / 2, height / 2, 75, width / 2, height / 2);
}

function draw() {
  background(51);

  updateStaticCircle();
  updateMovingCircle();

  checkCollisions();

  drawStaticCircle();
  drawMovingCircle();

  drawInfoText(staticCircle, 'Static Circle', 10, 15);
  drawInfoText(movingCircle, 'Moving Circle', 10, 150);

  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}

function mouseMoved() {
  staticCircle.target.x = mouseX;
  staticCircle.target.y = mouseY;
  movingCircle.position.x = mouseX;
  movingCircle.position.y = mouseY;
}

function updateStaticCircle() {
  staticCircle.update();
}

function drawStaticCircle() {
  staticCircle.draw();
}

function updateMovingCircle() {
  movingCircle.update();
}

function drawMovingCircle() {
  movingCircle.draw();
}

function checkCollisions() {
  d = dist(staticCircle.position.x, staticCircle.position.y, movingCircle.position.x, movingCircle.position.y);
  if (d <= staticCircle.radius + movingCircle.radius) {
    staticCircle.color = '#D46A6A';
    movingCircle.color = '#D46A6A';
  } else {
    staticCircle.color = 230;
    movingCircle.color = 230;
  }
}

function drawInfoText(circle, prL, prX, prY) {
  push();
  gap = 16;
  textSize(14);
  fill(255);
  stroke(0);
  text(prL, prX, prY);
  text("X: " + circle.position.x, prX, prY + gap);
  text("Y: " + circle.position.y, prX, prY + gap * 2);
  text("Angle: " + abs((((circle.angle * 180 / PI) + 360) % 360) - 360).toFixed(2) + '°', prX, prY + gap * 3);
  text("Closest X: " + circle.intersectPos.x.toFixed(2), prX, prY + gap * 4);
  text("Closest Y: " + circle.intersectPos.y.toFixed(2), prX, prY + gap * 5);
  pop();
}
