function DonutChart(x, y, outerDiameter, innerDiameter) {
  this.x = x;
  this.y = y;
  this.outerDiameter = outerDiameter;
  this.innerDiameter = innerDiameter;
  this.labelSpace = 30;

  this.get_radians = function(data) {
    var total = sum(data);
    var radians = [];

    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * TWO_PI);
    }

    return radians;
  };

  this.draw = function(data, labels, colours, title) {
    // Test that data is not empty and that each input array is the same length.
    if (data.length == 0) {
      alert('Data has length zero!');
    } else if (![labels, colours].every((array) => {
      return array.length == data.length;
    })) {
      alert(`Data (length: ${data.length})
Labels (length: ${labels.length})
Colours (length: ${colours.length})
Arrays must be the same length!`);
    }

    // https://p5js.org/examples/form-pie-chart.html
    var angles = this.get_radians(data);
    var lastAngle = 0;
    var colour;

    for (var i = 0; i < data.length; i++) {
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }

      fill(colour);
      stroke(255);  // White stroke for separation
      strokeWeight(2);  // Thicker stroke

      // Draw arc for the donut chart
      arc(this.x, this.y,
          this.outerDiameter, this.outerDiameter,
          lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!

      lastAngle += angles[i];
    }

    // Draw the inner circle to create the donut effect
    fill(255);  // White color for the inner circle
    noStroke();
    ellipse(this.x, this.y, this.innerDiameter, this.innerDiameter);

    if (title) {
      noStroke();
      fill(0);
      textAlign('center', 'center');
      textSize(24);
      text(title, this.x, this.y - this.outerDiameter / 2 - 20);  // Position title above the chart
    }

    if (labels) {
      for (var i = 0; i < labels.length; i++) {
        this.makeLegendItem(labels[i], i, colours[i]);
      }
    }
  };

  this.makeLegendItem = function(label, i, colour) {
    var x = this.x + this.outerDiameter / 2 + 20;
    var y = this.y - this.outerDiameter / 2 + (this.labelSpace * i);
    var boxWidth = this.labelSpace / 2;
    var boxHeight = this.labelSpace / 2;

    fill(colour);
    noStroke();
    rect(x, y, boxWidth, boxHeight);

    fill(0);
    noStroke();
    textAlign('left', 'center');
    textSize(12);
    text(label, x + boxWidth + 10, y + boxHeight / 2);
  };
}