let x = 0;
let y = 0;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvas-area");
  noLoop();
  background(51);
  stroke(255);
  noFill();
}

function draw() {
  for (let i = 0; i < 1000000; i++) {
    // Map the (x, y) coordinates to canvas pixels
    const px = map(x, -2.1820, 2.6558, 0, width);
    const py = map(y, 0, 9.9983, height, 0);
    point(px, py);

    // Choose a random transformation rule
    const r = random(1);
    let nextX, nextY;

    if (r < 0.01) {
      // Stem
      nextX = 0;
      nextY = 0.16 * y;
    } else if (r < 0.86) {
      // Successive leaflets
      nextX = 0.85 * x + 0.04 * y;
      nextY = -0.04 * x + 0.85 * y + 1.6;
    } else if (r < 0.93) {
      // Left leaflet
      nextX = 0.20 * x - 0.26 * y;
      nextY = 0.23 * x + 0.22 * y + 1.6;
    } else {
      // Right leaflet
      nextX = -0.15 * x + 0.28 * y;
      nextY = 0.26 * x + 0.24 * y + 0.44;
    }

    // Update point for the next iteration
    x = nextX;
    y = nextY;
  }
}