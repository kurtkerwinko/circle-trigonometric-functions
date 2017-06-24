function Circle(x, y, r, tX, tY) {
  this.position = createVector(x, y);
  this.radius = r;
  this.color = 'white';
  this.target = createVector(tX, tY);

  this.angle = atan2(this.target.y - this.position.y, this.target.x - this.position.y);
  this.intersectPos = createVector(this.position.x + this.radius * cos(this.angle), this.position.y + this.radius * sin(this.angle));

  this.update = function() {
    this.angle = atan2(this.target.y - this.position.y, this.target.x - this.position.x);
    this.intersectPos.x = this.position.x + this.radius * cos(this.angle);
    this.intersectPos.y = this.position.y + this.radius * sin(this.angle);
  };

  this.draw = function() {
    push();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    stroke(51);
    strokeWeight(2);
    arc(this.position.x, this.position.y, this.radius * 2 * 0.2, this.radius * 2 * 0.2, this.angle, 0);

    line(this.position.x, this.position.y, this.position.x + this.radius, this.position.y);

    textWidth = 20;
    adjacent = dist(this.position.x, this.position.y, this.intersectPos.x, this.position.y);
    opposite = dist(this.intersectPos.x, this.position.y, this.intersectPos.x, this.intersectPos.y);
    hypotenuse = this.radius;
    strokeWeight(2);
    textSize(14);

    // Draw adjacent line and length text
    fill('#116611');
    noStroke();
    aText = this.position.x > this.intersectPos.x ? adjacent : -adjacent;
    text(adjacent.toFixed(2), this.position.x - aText / 2 - textWidth, this.position.y + (this.intersectPos.y > this.position.y ? -3 : 14));
    stroke('#116611');
    line(this.position.x, this.position.y, this.intersectPos.x, this.position.y);

    // Draw opposite line and length text
    fill('#806D15');
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    this.position.x > this.intersectPos.x ? rotate(-PI/2) : rotate(PI/2);
    oText = this.position.x > this.intersectPos.x ? -opposite : opposite;
    oText *= this.position.y > this.intersectPos.y ? -1 : 1;
    text(opposite.toFixed(2), oText / 2 - textWidth, (adjacent * -1) - 3);
    pop();
    stroke('#806D15');
    line(this.intersectPos.x, this.position.y, this.intersectPos.x, this.intersectPos.y);

    // Draw hypotenuse line and length text
    fill('#261758');
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    hText = hypotenuse;
    if (this.position.x > this.intersectPos.x) {
      rotate(PI);
      hText *= -1;
    }
    text(hypotenuse.toFixed(2), hText / 2 - textWidth, (this.intersectPos.y > this.position.y ? 14 : -3));
    pop();
    stroke('#261758');
    line(this.position.x, this.position.y, this.intersectPos.x, this.intersectPos.y);

    // Draw intersect point
    fill(this.color);
    stroke(0);
    ellipse(this.intersectPos.x, this.intersectPos.y, 6, 6);
    pop();
  };
}
