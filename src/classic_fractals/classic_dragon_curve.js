new p5((p) => {
    let turns = [];
    let depth = 12;
    let length = 20;
  
    p.setup = function () {
      const canvas = p.createCanvas(1300, 1300);
      canvas.parent("canvas-area"); 
      p.angleMode(p.DEGREES);
      p.background(51);
      p.stroke(255);
      p.noFill();
      p.noLoop();
  
      // Build the sequence of turns
      for (let i = 0; i < depth; i++) {
        let next = [...turns]; 
        next.reverse();
        next = next.map(t => (t === 0 ? 1 : 0));
        turns.push(0); // left turn
        turns = turns.concat(next);
      }
  
      // Draw the dragon curve using the turn instructions
      p.translate(1000, 300);
      let dir = 0;
  
      for (let i = 0; i < turns.length; i++) {
        const angle = turns[i] === 0 ? 90 : -90;
        dir += angle;
  
        const x2 = p.cos(dir) * length;
        const y2 = p.sin(dir) * length;
  
        p.line(0, 0, x2, y2);
        p.translate(x2, y2);
      }
    };
  });
  