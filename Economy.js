function EconomyMountains() {
  this.animProgress = 0;
  this.growing = true;
  this.mountainHeight = 0;
  this.currentCountryIndex = 0;

  this.countryEconomies = [];
  var self = this;
  this.loaded = false;
  this.maxEconomy = 0; // Define maxEconomy here

  // Predefined colors for the top 10 countries
  this.fixedColors = [
    color(255, 0, 0),     // Red
    color(0, 255, 0),     // Green
    color(0, 0, 255),     // Blue
    color(255, 255, 0),   // Yellow
    color(255, 165, 0),   // Orange
    color(128, 0, 128),   // Purple
    color(0, 255, 255),   // Cyan
    color(255, 192, 203), // Pink
    color(165, 42, 42),   // Brown
    color(0, 128, 128)    // Teal
  ];

  // Name for the visualization to appear in the menu bar.
  this.name = 'Economy Of Europe';

  // Each visualization must have a unique ID with no special characters.
  this.id = 'Economy-Mountains';

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    // Margin positions around the plot. Left and bottom margins are bigger
    // so there is space for axis and tick labels on the canvas.
    leftMargin: 130,
    rightMargin: width,
    topMargin: 30,
    bottomMargin: height,
    pad: 5,

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

  // Preload the data. This function is called automatically by the gallery
  // when a visualization is added.
  this.preload = function() {
    this.data = loadTable(
      './data/Economy_Indicators.csv', 'csv', 'header',
      function(table) {
        for (let i = 1; i < table.getRowCount(); i++) {
          let country = table.getString(i, 'Country');
          let economy = table.getNum(i, 'GDP');
          
          self.countryEconomies.push({ country: country, economy: economy });
        }

        // Sort by economy in descending order and take the top 10
        self.countryEconomies.sort((a, b) => b.economy - a.economy);
        self.countryEconomies = self.countryEconomies.slice(0, 10);

        // Assign fixed colors to the top 10 countries
        for (let i = 0; i < self.countryEconomies.length; i++) {
          self.countryEconomies[i].color = self.fixedColors[i];
        }

        // Calculate maxEconomy here
        self.maxEconomy = self.countryEconomies[0].economy;

        self.loaded = true;
      }
    );
  };

  this.setup = function() {
    textSize(16);
  };

  this.destroy = function() {
    window.location.reload(true);
  };

  this.draw = function() {
    background(0);
      
    textSize(20);
    fill(255);
    textAlign(CENTER);
    text('TOP 10 BIGGEST ECONOMIES OF EUROPE', width / 2, 30);
      
    if (!self.loaded) {
      // Data is not yet loaded
      textAlign(CENTER, CENTER);
      fill(255);
      text('Loading data...', width / 2, height / 2);
      return;
    }

    self.animProgress += 0.01;
    if (self.animProgress > 1) self.animProgress = 1;

    if (self.currentCountryIndex < self.countryEconomies.length) {
      if (self.growing) {
        self.mountainHeight += 5;
        if (self.mountainHeight >= self.countryEconomies[self.currentCountryIndex].economy / self.maxEconomy * height) {
          self.mountainHeight = self.countryEconomies[self.currentCountryIndex].economy / self.maxEconomy * height;
          self.growing = false;
        }
      } else {
        self.currentCountryIndex++;
        self.mountainHeight = 0;
        self.growing = true;
      }
    }

    // Ensure that we do not exceed the array bounds
    for (let i = 0; i <= Math.min(self.currentCountryIndex, self.countryEconomies.length - 1); i++) {
      let x = map(i, 0, self.countryEconomies.length, 0, width );
      let h = (i == self.currentCountryIndex && self.growing) ? self.mountainHeight : self.countryEconomies[i].economy / self.maxEconomy * height;
      self.drawMountain(x + 80, h - 50, self.countryEconomies[i].country, self.countryEconomies[i].economy, self.countryEconomies[i].color);
    }
  };

  this.drawMountain = function(x, h, country, economy, color) {
    fill(color);
    noStroke();
    triangle(x - 60, height, x, height - h, x + 60, height);
    fill(255);
    textAlign(CENTER);
    // Convert the economy value to trillions and format it
    let formattedEconomy = (economy / 1e3).toFixed(2) + ' trillion';
    text(`${country}: ${formattedEconomy}`, x+20, height - h - 10);
  };
}
