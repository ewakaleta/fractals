let trees = [];
var lengthSlider;
var rotationSlider;
var maxHeightSlider;
var weightSlider;
var splitSlider;


/**
 *TODO: sliders for:
 1. randomizing?
 2. grow step - how much new branches shrink (currently hard coded 0.67)
 **/

function setup() {
    createCanvas(800, 800);
    lengthSlider = createSlider(0, 250, 200, 25);
    rotationSlider = createSlider(0.1, 2, 0.75, 0.1);
    maxHeightSlider = createSlider(0, 7, 5, 1);
    weightSlider = createSlider(1, 10, 2, 1);
    splitSlider = createSlider(2, 6, 2, 2);
}

function draw() {
    background(51);
    stroke(255);

    push();
    var lenght = lengthSlider.value();
    var rotation = rotationSlider.value();
    var maxHeight = maxHeightSlider.value();
    var weight = weightSlider.value();
    var split = splitSlider.value();
    const tree = new Branch(createVector(width / 2, height), lenght, 0, 0, 
                                            maxHeight, weight, split, rotation);
    tree.draw();
    pop();
}
