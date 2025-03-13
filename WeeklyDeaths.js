let weeklyDeaths;
function WeeklyDeaths() {

  // Name for the visualization to appear in the menu bar.
  this.name = 'Weekly Deaths by Week';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Weekly-Deaths-by-Week';

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    leftMargin: 130,
    rightMargin: width - 50,
    topMargin: 50,
    bottomMargin: height - 100,
    pad: 20,
    grid: true,
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Preload the data
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/Weekly-deaths/weeklydeathsweek222024.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    textSize(16);
  };

  this.destroy = function() {
      window.location.reload(true);
  };

  this.draw = function() {
    background(255);
    let tableArray = this.data.getArray();

    // Create an object to group the number of deaths by week number
    let deathsByWeek = {};
    for (let i = 0; i < tableArray.length; i++) {
      let weekNumber = tableArray[i][0];  // 'Week-number' column
      let deaths = int(tableArray[i][6]); // 'Number-of-deaths' column

      if (deathsByWeek[weekNumber]) {
        deathsByWeek[weekNumber] += deaths;
      } else {
        deathsByWeek[weekNumber] = deaths;
      }
    }

    // Convert the deathsByWeek object into an array and sort it by week number
    let sortedWeeks = Object.entries(deathsByWeek).sort((a, b) => int(a[0]) - int(b[0]));

    // Get the maximum number of deaths for scaling
    let maxDeaths = max(sortedWeeks.map(row => row[1]));

    // Draw title
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text('Weekly Deaths Over Time', width / 2, this.layout.topMargin - 20);

    // Draw axes labels
    textSize(16);
    textAlign(CENTER);
    text('Week Number', width / 2, height - 50);
    textAlign(RIGHT);
    text('Number of Deaths', this.layout.leftMargin - 10, height / 2);

    // Y axis ticks and labels
    for (let i = 0; i <= 8; i++) {
      let yValue = i * (maxDeaths / 8);
      let y = map(yValue, 0, maxDeaths, height - 100, 100);
      stroke(200);
      line(this.layout.leftMargin, y, width - 50, y);
      noStroke();
      fill(0);
      textAlign(RIGHT, CENTER);
      text(int(yValue), this.layout.leftMargin - 10, y);
    }

    // Draw bars for each week
    for (let i = 0; i < sortedWeeks.length; i++) {
      let weekNumber = sortedWeeks[i][0];
      let deaths = sortedWeeks[i][1];

      let x = this.layout.leftMargin + i * 60;
      let barHeight = map(deaths, 0, maxDeaths, 0, height - 200);
      fill(500, 10, 10);
      rect(x, height - 100, 40, -barHeight);

      fill(0);
      textAlign(CENTER);
      text(weekNumber, x + 20, height - 80);
      text(deaths, x + 20, height - 110 - barHeight);
    }
  };
}
