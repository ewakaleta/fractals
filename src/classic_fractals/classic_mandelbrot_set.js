// new p5((p) => {
//   // --- CONFIGURABLE OPTIONS ---
//   const useColor = true;      // Toggle color mode
//   const insideHue = 0;        // Hue for points inside the set (0 = red, 120 = green, etc.)
//   const baseHue = 25;        // Starting hue for outside gradient
//   const hueRange = 110;       // How wide the hue range is (0–255)

//   const maxIterations = 150;
//   const zoom = 300;
//   const offsetX = -1.75;
//   const offsetY = -1.5;

//   p.setup = function () {
//     const canvas = p.createCanvas(800, 800);
//     canvas.parent("canvas-area");
//     p.noLoop();

//     p.pixelDensity(1);
//     p.loadPixels();

//     for (let x = 0; x < p.width; x++) {
//       for (let y = 0; y < p.height; y++) {
//         // Convert pixel to complex number c = a + bi
//         const aStart = x / zoom + offsetX;
//         const bStart = y / zoom + offsetY;

//         let a = 0;
//         let b = 0;
//         let n = 0;

//         while (n < maxIterations) {
//           const aa = a * a - b * b;
//           const bb = 2 * a * b;

//           a = aa + aStart;
//           b = bb + bStart;

//           if (a * a + b * b > 16) break;

//           n++;
//         }

//         // Determine color based on iterations
//         let col;
//         if (useColor) {
//           p.colorMode(p.HSB, 255);
//           if (n === maxIterations) {
//             col = p.color(insideHue, 255, 0); // dark inside color (0 brightness)
//           } else {
//             const hue = p.map(n, 0, maxIterations, baseHue, baseHue + hueRange);
//             col = p.color(hue % 255, 255, 255); // wrapped hue for nice loop
//           }
//         } else {
//           const bright = n === maxIterations ? 0 : p.map(n, 0, maxIterations, 0, 255);
//           col = p.color(bright);
//         }

//         // Write to pixel buffer
//         const pix = (x + y * p.width) * 4;
//         p.pixels[pix + 0] = p.red(col);
//         p.pixels[pix + 1] = p.green(col);
//         p.pixels[pix + 2] = p.blue(col);
//         p.pixels[pix + 3] = 255;
//       }
//     }

//     p.updatePixels();
//   };
// });


new p5((p) => {
    // --- CONFIGURABLE OPTIONS ---
    const useColor = true;      // Toggle color mode
    const insideHue = 0;        // Hue for points inside the set (0 = red, 120 = green, etc.)
    const baseHue = 55;        // Starting hue for outside gradient
    const hueRange = 110;       // How wide the hue range is (0–255)
  
    const maxIterations = 150;
    const zoom = 300;
    const offsetX = -1.75;
    const offsetY = -1.5;
  
    p.setup = function () {
      const canvas = p.createCanvas(800, 800);
      canvas.parent("canvas-area");
      p.noLoop();
  
      setupPixels(p);
  
      for (let x = 0; x < p.width; x++) {
        for (let y = 0; y < p.height; y++) {
          // Convert pixel to complex number c = a + bi
          const { aStart, bStart } = pixelToComplexNum(x, y, zoom, offsetX, offsetY);

          const iterations = mandelbrotIteration(aStart, bStart, maxIterations);
  
          determineColors(p, x, y, iterations, maxIterations, useColor, baseHue, hueRange, insideHue);
        }
      }
      p.updatePixels();
    };
  });