new p5((p) => {
  p.setup = function () {
    const canvas = p.createCanvas(800, 800);
    canvas.parent("canvas-area");
    p.noLoop();
    p.background(51);
    p.stroke(255);
    p.noFill();
  };

  p.draw = function () {
    function drawSingleTriangle(p, x, y, size) {
      const height = (Math.sqrt(3) / 2) * size;
      p.triangle(
        x, y,
        x - size / 2, y + height,
        x + size / 2, y + height
      );
    }

    function triangle_rec(x, y, size, depth) {
      if (depth === 0) {
        drawSingleTriangle(p, x, y, size);
        return;
      }

      const half = size / 2;
      const height = (Math.sqrt(3) / 2) * size;
      const halfHeight = height / 2;

      triangle_rec(x, y, half, depth - 1);                          // Top
      triangle_rec(x - half / 2, y + halfHeight, half, depth - 1); // Bottom left
      triangle_rec(x + half / 2, y + halfHeight, half, depth - 1); // Bottom right
    }

    triangle_rec(p.width / 2, (p.height - (Math.sqrt(3) / 2) * 400) / 2, 400, 4);
  };
});
