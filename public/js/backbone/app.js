var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.initialize = function(){
  var sketches = new Sketcher.Collections.SketchCollection();
  var listView = new Sketcher.Views.SketchListView({
    el: $('.saved-sketches'),
    collection: sketches
  });

  sketches.fetch();

  $('.sketch-details').on('submit', function(e){
  console.log('here')
    e.preventDefault();


    var svgs = $('.etch-a-sketch svg');
    var string = ""
    $.each(svgs, function(i, elem) {
       var s = new XMLSerializer();
       var drawing = s.serializeToString(elem);
       string += drawing;
    });


    // var drawing = saveSvgAsPng(document.getElementById("new-drawing"), "drawing.png");


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

    debugger;
  });
};

$(function(){
  console.log('inch by inch... row by row...')
  Sketcher.initialize();
  littleMap();
  stateMap();
  fancyMap();
})
