function Race() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'F-1 WINS';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'wins';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Select DOM element to hold the company names.
  this.select;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/F1_2022_data.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  var self = this;

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 20);

    // Fill the options with all company names.
    var Names = this.data.columns;
    for (var i = 4; i < Names.length; i++) {
      this.select.option(Names[i]);
    }
  };

  this.destroy = function() {
    this.select.remove();
             // Refresh the page
    window.location.reload(true);
  
  };

  // Create a new pie chart object.
  this.Donut = new DonutChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {


    fill("black");
    

    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var Name = this.select.value();

    // Get the column of raw data for companyName.
    var col = this.data.getColumn(Name);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(Name);

    // Colour to use for each category.
    var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow', 'orange', 'brown', 'black', 'white', 'gray', 'turquoise', 'maroon', 'navy', 'teal', 'lime', 'magenta', 'cyan', 'lavender', 'gold', 'silver', 'peach'];

    // Make a title.
    var title = 'F1 ' + Name;

    // Draw the pie chart!
    this.Donut.draw(col, labels, colours, title);
      fill("white");
      ellipse(width/2,height/2,450);
  };
}