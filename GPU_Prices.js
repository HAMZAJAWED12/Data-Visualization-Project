function GPU() {
    
  

  // Name for the visualisation to appear in the menu bar.
  this.name = 'GPU-PRICES';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'GPU';

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    // Margin positions around the plot. Left and bottom margins are
    // bigger so there is space for axis and tick labels on the canvas.
    leftMargin: 130,
    rightMargin: width,
    topMargin: 30,
    bottomMargin: height,
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
  // gallery when a visualisation is added.
  this.preload = function() {
        
    this.data = loadTable(
      './data/GPU_Price_Index.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };
    
    
  this.Status = false;
  this.Status2 = false;
  var self = this;

  this.setup = function() {
    textSize(18);
    createCanvas(1800, 900);
    this.Button = createButton("Highest price");
    this.Button.position(width/2, 900);
    this.Button2 = createButton("lowest price");
    this.Button2.position(width/4, 900);
  };

  this.destroy = function() {
    this.Button.remove();
    this.Button2.remove();
             // Refresh the page
    window.location.reload(true);
  };

  this.draw = function() {

    this.Button.mousePressed(function(){
      self.Status = !self.Status;
    })
      
    this.Button2.mousePressed(function(){
      self.Status2 = !self.Status2;
    })
      
    
    background(240);

    this.rowCount = this.data.getRowCount()-11;
    this.pointSize = 8;
    this.yMax = 1800;

    // Draw y-axis labels
    fill(0);
    for (var i = 0; i <= this.yMax; i += 200) {
      this. y = map(i, 0, this.yMax, this.layout.bottomMargin, this.layout.topMargin);
      line(this.layout.leftMargin - 5, this.y, this.layout.leftMargin, this.y);
      text(i, this.layout.leftMargin - 40, this.y + 5);
    }

    for ( var i = 0; i < this.rowCount; i++) {
      this.model = this.data.getString(i, "GPU Model");
      this.bestPrice = this.data.getNum(i, "Best US Price");
      this.lowestPrice = this.data.getNum(i, "Lowest-Ever US Price");

      this.x = map(i, 0, this.rowCount - 1, this.layout.leftMargin, this.layout.rightMargin);

      // Draw points and lines for best and lowest prices
      if (this.bestPrice !== null && this.lowestPrice !== null) {
        this.yBest = map(this.bestPrice, 0, this.yMax, this.layout.bottomMargin, this.layout.topMargin);
        this.yLowest = map(this.lowestPrice, 0, this.yMax, this.layout.bottomMargin, this.layout.topMargin);

        // Draw line connecting the points
        stroke(100);
        line(this.x, this.yBest, this.x, this.yLowest);
          
          if(this.Status==true)
        {
        // Draw best price point
        fill(50, 100, 250);
        noStroke();
        ellipse(this.x, this.yBest, this.pointSize, this.pointSize);
        text(this.bestPrice, this.x + 5, this.yBest - 5);
        };
          
           if(this.Status2==true)
        {  
        // Draw lowest price point
        fill(250, 100, 50);
        noStroke();
        ellipse(this.x, this.yLowest, this.pointSize, this.pointSize);
        text(this.lowestPrice, this.x + 5, this.yLowest - 5);
        }
      }

      // Draw model name
      push();
      translate(this.x, height - 20);
      rotate(-PI / 2);
      text(this.model, 0, 0);
      pop();
    }

         
       
}

}