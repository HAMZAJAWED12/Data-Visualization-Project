function Nuclear() {
    
  

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Nuclear-Power';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Nuclear';

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
    var self = this;
    this.data = loadTable(
      './data/Nuclear_Electricity_Statistics_2022.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
    textSize(18);
  };

  this.destroy = function() {
             // Refresh the page
    window.location.reload(true);
  };

  this.draw = function() {
        
          let tableArray = this.data.getArray();
          let dataArray = [];
            for(let i=0;i<tableArray.length;i++){
                 let power = this.data.getNum(i, "Number of Operated Reactors");
                 let name = this.data.getString(i, "Country");
                 dataArray.push({power: power,name: name});
            }
      
                  dataArray.sort((a, b) => b.power - a.power);//sort
      
                     for (let i = 0; i < dataArray.length; i++) {
                    text(dataArray[i].power, 350, 50 + (25 * i));
                     text(dataArray[i].name, 10, 50 + (25 * i));
                         
                         this.m = map(dataArray[i].power,1,93,1,200);
                         
                         
                         
                         // Set ellipse color based on condition
                    if (dataArray[i].power > 20) {
                            fill('red');
                        } else {
                            fill('green');
                            }
      
                    ellipse(500,50+(25*i),this.m);
                     }// Adjust position as needed
                         
                         text("Number of Nuclear Reactors by Country", width / 2, 30);
        };
}

