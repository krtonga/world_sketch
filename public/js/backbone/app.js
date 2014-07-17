var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.initialize = function() {
  var sketches = new Sketcher.Collections.SketchCollection();
  var listView = new Sketcher.Views.SketchListView({
    el: $('.saved-sketches'),
    collection: sketches
  });
  sketches.fetch();

  $('.sketch-details').on('submit', function(e){
    // console.log('form submitted.')
    e.preventDefault();
    var svgs = $('.etch-a-sketch svg');
    var string = ""
    $.each(svgs, function(i, elem) {
       var s = new XMLSerializer();
       var drawing = s.serializeToString(elem);
       string += drawing;
    });
    var artistField = $('.name');
    var newArtist = artistField.val();
    artistField.val('');

    var locationField = $('.location');
    var newLocation = locationField.val();
    locationField.val('');

    var tagsField = $('.tags');
    var newTags = tagsField.val();
    tagsField.val('');

    var storyField = $('.story');
    var newStory = storyField.val();
    storyField.val('');

    sketches.create({data:string, artist:newArtist, location:newLocation, group:newTags, story:newStory});
  });
};

// // One day, the colors will change without me hardcoding them in...
// var getRandomColor = function() {
//   var arr = ["#CCD8E", "#A9B7C2", "#90ABBF", "#FFFOD3", "#FFD9BC"];
//   $(".thats-the-intro").each(function( li ) {
//     console.log("heya", getRandomColor() )
//     var randomIndex = Math.floor(Math.random() * arr.length)
//     var selectedColor = arr[randomIndex]
//     li.style.background = selectedColor
//     });
//   }


var getLocation = function(){
  if (!navigator.geolocation){
    // // makes ip the backup for an empty location
    // $.getJSON( "http://smart-ip.net/geoip-json?callback=?",
    //   function(data){
    //     alert( data.host);
    //   }
    // );
    console.log("geolocation unavailable.")
  };
  $(".geolocation").html("<p>locating</p>");
  function success(position) {
    console.log("hello.");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var text = "<p><strong> Is this your location? </strong><br> Latitude: " + latitude + "<br> Longitude: " + longitude + "</p>"
    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=10&size=100x100&sensor=false";
    $(".geolocation").empty();
    $(".geolocation").append(text, img);
    $(".location").val(latitude + ", " + longitude)
  };
  function error() {
    $(".geolocation").html("no geolocation");
  };

  navigator.geolocation.getCurrentPosition(success, error);
}

$(function(){
  console.log('inch by inch... row by row...')
  Sketcher.initialize();
  // fancyMap();
  littleMap();
  getLocation();
  // getRandomColor();
  // pickIntroColors();
})
