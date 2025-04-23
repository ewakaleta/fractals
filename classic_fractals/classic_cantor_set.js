new p5((p) => {
    let depth = 6;
    let startY = 50;
    let length = 600;
  
    p.setup = function () {
      const canvas = p.createCanvas(800, 600);
      canvas.parent("canvas-area");
      p.background(51);
      p.stroke(255);
      p.noLoop();
  
      drawCantor(p, 100, startY, length, depth);
    };
  
    /**
     * Recursively draws the Cantor Set.
     * @param {p5} p - p5 instance
     * @param {number} x - x position of the line start
     * @param {number} y - y position of the line
     * @param {number} len - length of the current line
     * @param {number} depth - recursion level
     */
    function drawCantor(p, x, y, len, depth) {
      if (depth === 0) return;
  
      // Draw current line
      p.line(x, y, x + len, y);
  
      // Compute y spacing between levels
      const ySpacing = 20;
  
      // Recurse: draw two smaller lines below, skipping the middle third
      const newLen = len / 3;
      drawCantor(p, x, y + ySpacing, newLen, depth - 1);               // Left
      drawCantor(p, x + 2 * newLen, y + ySpacing, newLen, depth - 1); // Right
    }
  });
  