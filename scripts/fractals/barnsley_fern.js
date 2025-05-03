function barnsleyFern(p, startX, startY, iterations) {
    // Start at the initial point
    let x = startX;
    let y = startY;

    for (let i = 0; i < iterations; i++) {
        // Draw the point (scaled to canvas)
        const px = p.map(x, -2.1820, 2.6558, 0, p.width);
        const py = p.map(y, 0, 9.9983, p.height, 0); 
        p.point(px, py);

        // Randomly choose one of four drawing rules
        const r = p.random(1);

        // Define the next point coordinates
        let nextX, nextY;

        // Based on the random number, apply a different rule:
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

        // Move to the next point to be drawn
        x = nextX;
        y = nextY;
    }
}