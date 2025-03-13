// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;

function setup() {
  // Create a canvas to fill the content div from index.html.
  var c = createCanvas(1600, 800);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());
  gallery.addVisual(new WeeklyDeaths());
  gallery.addVisual(new Race());
  gallery.addVisual(new Nuclear());  
  gallery.addVisual(new GPU());
  gallery.addVisual(new AirCrashes());   
  gallery.addVisual(new US_Presidents()); 
  gallery.addVisual(new fifaCups());  
  gallery.addVisual(new EconomyMountains());    
}

function draw() {
  background(255);
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
    
  }
    if(gallery.selectedVisual == null){
         textSize(20);
         text("NOTE : FOR EXTENSIONS ADDED BY ME,DOUBLE CLICK TO SEE EXTENSION BECAUSE ON A SINGLE CLICK THE PAGE WILL REFRESH",200,400);
    }
  

}
