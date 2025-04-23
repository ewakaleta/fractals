new p5((p) => {
    const maxIterations = 100;
    const zoom = 200;
    const offsetX = -2.5;
    const offsetY = -1.5;
  
    p.setup = function () {
      const canvas = p.createCanvas(800, 800);
      canvas.parent("canvas-area");
      p.pixelDensity(1);
      p.noLoop();
      p.loadPixels();
  
      for (let x = 0; x < p.width; x++) {
        for (let y = 0; y < p.height; y++) {
          // Convert pixel to complex number c = a + bi
          const aStart = x / zoom + offsetX;
          const bStart = y / zoom + offsetY;
  
          let a = 0;
          let b = 0;
          let n = 0;
  
          while (n < maxIterations) {
            const aa = a * a - b * b;
            const bb = 2 * a * b;
  
            a = aa + aStart;
            b = bb + bStart;
  
            if (a * a + b * b > 16) {
              break;
            }
  
            n++;
          }
  
          const bright = n === maxIterations ? 0 : p.map(n, 0, maxIterations, 0, 255);
          const pix = (x + y * p.width) * 4;
          p.pixels[pix + 0] = bright;
          p.pixels[pix + 1] = bright;
          p.pixels[pix + 2] = bright;
          p.pixels[pix + 3] = 255;
        }
      }
  
      p.updatePixels();
    };
  });
  