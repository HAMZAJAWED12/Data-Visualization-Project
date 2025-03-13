function US_Presidents() {
  
  // Name for the visualisation to appear in the menu bar.
  this.name = 'US-Presidents';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'US';
  
  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    leftMargin: 130,
    rightMargin: 1600,  // Updated for 1600 width canvas
    topMargin: 30,
    bottomMargin: 800,  // Updated for 800 height canvas
    pad: 20,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },
      
    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    }
  };

   this.insideRadius = 100;
   this.outsideRadius = 150;
   this.presidents = [];
   this.maxYears = 0;
   this.loaded = false;
   var self = this;

  this.preload = function() {
    this.data = loadTable(
      './data/US-Presidents.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      }
    );
  };

    this.destroy = function(){
    // Refresh the page
    window.location.reload(true);
    }
    
  this.setup = function() {
    angleMode(DEGREES);
    textSize(16);
    textAlign(CENTER, CENTER);
  };

  this.draw = function() {
    background(0);

     this.centerX = width / 2;
     this.centerY = height / 2;

    if (this.loaded) {
      this.presidents = this.data.rows.map(row => ({
        name: row.get('President'),
        start: row.get('start of presidency'),
        end: row.get('end of presidency')
      }));
      
      this.maxYears = max(this.presidents.map(p => this.calculateYears(p.start, p.end)));

       this.pointCount = map(mouseX, 0, width, 1, this.presidents.length);
       this.pointCount = round(constrain(this.pointCount, 1, this.presidents.length));

       this.angleStep = 360.0 / this.pointCount;
       this.angle = 0;

      for (let i = 0; i < this.pointCount; i++) {
         this.president = this.presidents[i];
         this.years = this.calculateYears(this.president.start, this.president.end);
         this.hue = map(this.years, 0, this.maxYears, 0, 255);

        fill(this.hue, 255, 255);
        beginShape(TRIANGLE_STRIP);

        // Outer point
         this.pointX = this.centerX + cos(this.angle) * this.outsideRadius;
         this.pointY = this.centerY + sin(this.angle) * this.outsideRadius;
        vertex(this.pointX, this.pointY);

        // Inner point
        this.pointX = this.centerX + cos(this.angle + this.angleStep) * this.insideRadius;
        this.pointY = this.centerY + sin(this.angle + this.angleStep) * this.insideRadius;
        vertex(this.pointX, this.pointY);

        endShape();

        // Display the president's name
        push();
        translate(this.centerX, this.centerY);
        rotate(this.angle + this.angleStep / 4);
        fill(255);
        text(this.president.name, (this.insideRadius + this.outsideRadius) / 1, 0); 
        pop();
          
     // Draw the rotating blue line
      push();
      translate(this.centerX, this.centerY);
      rotate(this.angle + this.angleStep/4);
      stroke(0, 0, 255);
      line(0, 0,this.outsideRadius, 0);
      pop();
        

        this.angle += this.angleStep;
      }
        
     


      // Display the number of presidents shown
      fill(255);
      text(`Presidents shown: ${this.pointCount}`, width - 100, height - 30);
      text(`NUMBERS OF USA PRESIDENTS OVER THE YEARS`, 255, 30);
      text(`MOVE YOUR MOUSE POINTER ACROSS THE X-AXIS TO SEE MORE RESULTS`, 355, 100);
    } else {
      console.error('Data not loaded!');
    }
  };

  this.calculateYears = function(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);
    return (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
  };
}
