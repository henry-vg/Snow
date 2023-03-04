const numFlakes = 500,
  sizeInterval = [2, 8],
  amplitudeInterval = [5, 25],
  frequencyInterval = [0.25, 2],
  vRatio = 0.25,
  flakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  noFill();
  stroke(255, 200);

  angleMode(DEGREES);

  for (let i = 0; i < numFlakes; i++) {
    flakes.push(new flakeObject());
    flakes[i].generate();
  }
}

function draw() {
  background(0);

  for (let i = 0; i < numFlakes; i++) {
    flakes[i].show();
    flakes[i].y += vRatio * flakes[i].size;
    flakes[i].x = flakes[i].xSpawn + flakes[i].amplitude * sin(flakes[i].frequency * flakes[i].y + flakes[i].phase);
    if (flakes[i].y > height + flakes[i].size / 2) {
      flakes[i].generate();
    }
  }
}

function flakeObject() {
  this.show = function () {
    strokeWeight(this.size);
    point(this.x, this.y);
  }
  this.generate = function () {
    this.size = random(sizeInterval[0], sizeInterval[1]);
    this.xSpawn = random(this.size / 2, width - this.size / 2);
    this.x = this.xSpawn;
    this.y = -this.size / 2;
    if (!this.amplitude) {
      this.y = random(this.size / 2, height + this.size / 2);
    }
    this.amplitude = random(amplitudeInterval[0], amplitudeInterval[1]);
    this.frequency = random(frequencyInterval[0], frequencyInterval[1]);
    this.phase = random(TWO_PI);
  }
}