function AirCrashes() {
  // Name for the visualization to appear in the menu bar.
  this.name = 'Air Crashes Over Time';

  // Each visualization must have a unique ID with no special characters.
  this.id = 'air-crashes';

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    // Margin positions around the plot. Left and bottom margins are
    // bigger so there is space for axis and tick labels on the canvas.
    leftMargin: 100,
    rightMargin: 1000,
    topMargin: 30,
    bottomMargin: 550,
    pad: 20,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Preload the data. This function is called automatically by the
  // gallery when a visualization is added.
  this.preload = function() {
    this.self = this;
    this.data = loadTable(
      './data/fatal-airliner-accidents-per-million-flights.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    textSize(12);
  };

  this.destroy = function() {
             // Refresh the page
    window.location.reload(true);
  };

  this.draw = function() {
    
    background(240);
    this.rowCount = this.data.getRowCount();
    this.yMax = 7;

    // Draw y-axis labels
    fill(0);
    for (var i = 0; i <= this.yMax; i += 1) {
      this.y = map(i, 0, this.yMax, this.layout.bottomMargin, this.layout.topMargin);
      line(this.layout.leftMargin - 5, this.y, this.layout.leftMargin, this.y);
      text(i, this.layout.leftMargin - 40, this.y + 5);
    }

    this.previousX, this.previousY;
      
    for (var i = 0; i < this.rowCount; i++)
    {
      this.year = this.data.getNum(i, "Year");
      this.accidents = this.data.getNum(i, "Fatal accidents per million commercial flights");

      this.x = map(this.year, this.data.getNum(0, "Year"), this.data.getNum(this.rowCount - 1, "Year"), this.layout.leftMargin, this.layout.rightMargin);
      this.y = map(this.accidents, 0, this.yMax, this.layout.bottomMargin, this.layout.topMargin);

      fill(50, 100, 250);
      noStroke();
      ellipse(this.x, this.y, 8, 8);
      text(this.accidents, this.x + 5, this.y - 5);

      if (i > 0) {
        stroke(50, 100, 250);
        line(this.previousX, this.previousY, this.x, this.y);
      }

      this.previousX = this.x;
      this.previousY = this.y;
    }

    // Draw x-axis labels
    fill(0);
    for ( var i = 0; i < this.rowCount; i += floor(this.rowCount / 10)) {
      this.year = this.data.getNum(i, "Year");
      this.m = map(this.year, this.data.getNum(0, "Year"), this.data.getNum(this.rowCount - 1, "Year"), this.layout.leftMargin, this.layout.rightMargin);
      text(this.year, this.m, this.layout.bottomMargin + 20);
    }
  };
}
