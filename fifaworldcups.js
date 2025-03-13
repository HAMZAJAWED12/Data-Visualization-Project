function fifaCups() {
    
  // Name for the visualisation to appear in the menu bar.
  this.name = 'World-Cup(1930-2022)';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'WorldCup';

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    // Margin positions around the plot. Left and bottom margins are
    // bigger so there is space for axis and tick labels on the canvas.
    leftMargin: 130,
    rightMargin: 1600 - 50,
    topMargin: 30,
    bottomMargin: 800 - 30,
    pad: 20,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    }
  };

  this.hoveredYear = null;
  this.data = null;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    this.img= loadImage('./data/image.jpg')  
    this.data = loadTable(
      './data/world_cup.csv', 'csv', 'header'
    );
  };

  this.setup = function() {
    //textSize(16);
  };

  this.destroy = function() {
             // Refresh the page
    window.location.reload(true);
  };

  this.draw = function() {
    background(220);
      image(this.img,-150,0);
      textSize(20);
      fill("Black");
      text(`HOVER ON YEARS TO SEE RESULTS OF EVERY FOOTBALL WORLD CUP`, 800,50);
    
    let tableArray = this.data.getArray();

    // Display years as rectangles on the left
    for (let i = 0; i < tableArray.length; i++) {
       this.y = map(i, 0, tableArray.length - 1, this.layout.topMargin, this.layout.bottomMargin);
      if (this.hoveredYear === tableArray[i][0]) {
        fill(200, 0, 0);
      } 
        else 
      {
        fill("Violet");
      }
      rect(this.layout.leftMargin+200, this.y - 10, 60, 20);
      fill(255); 
      textSize(16);
      textAlign(CENTER, CENTER);
      text(tableArray[i][0], this.layout.leftMargin + 230, this.y);
    }

    // Display stats on the right if a year is hovered
    if (this.hoveredYear) {
       this.selectedData = tableArray.find(row => row[0] == this.hoveredYear);
       this.stats = [
        `Host: ${this.selectedData[1]}`,
        `Teams: ${this.selectedData[2]}`,
        `Champion: ${this.selectedData[3]}`,
        `Runner-Up: ${this.selectedData[4]}`,
        `Top Scorer: ${this.selectedData[5]}`,
        `Attendance: ${this.selectedData[6]}`,
        `Attendance Avg: ${this.selectedData[7]}`,
        `Matches: ${this.selectedData[8]}`
      ];

      fill("white");        
      for (let i = 0; i < this.stats.length; i++) { 
          textSize(30);
        text(this.stats[i], 1200, 300 + 20 + i * 40);
      }
    }

    // Handle mouse hover
    this.hoveredYear = null;
    for (let i = 0; i < tableArray.length; i++) {
       this.y2 = map(i, 0, tableArray.length - 1, this.layout.topMargin, this.layout.bottomMargin);
      if (mouseX > this.layout.leftMargin+200 && mouseX < this.layout.leftMargin+200 + 60 && mouseY > this.y2 - 10 && mouseY < this.y2 + 10) {
        this.hoveredYear = tableArray[i][0];
        break;
      }
    }
  };
}

