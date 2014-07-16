var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.initialize = function(){
  var sketches = new Sketcher.Collections.SketchCollection();
  var listView = new Sketcher.Views.SketchListView({
    el: $('.saved-sketches'),
    collection: sketches
  });

  sketches.fetch();

  $('.sketch-details').on('submit', function(e){
  console.log('form submitted.')

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

var getLocation = function(){

  if (!navigator.geolocation){
    $.getJSON( "http://smart-ip.net/geoip-json?callback=?",
      function(data){
        alert( data.host);
      }
    );
    console.log("geolocation unavailable. using ip address")
  };
  function success(position) {
    console.log("hello");
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

  $(".geolocation").html("<p>locating</p>");

  navigator.geolocation.getCurrentPosition(success, error);
}

$(function(){
  console.log('inch by inch... row by row...')
  Sketcher.initialize();
  littleMap();
  // fancyMap();
  getLocation();
})
