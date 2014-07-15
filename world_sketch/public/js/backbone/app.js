var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.initialize = function(){
  var sketches = new Sketcher.Collections.SketchCollection();
  var listView = new Sketcher.Views.SketchListView({
    el: $('.saved-sketches'),
    collection: sketches
  });

  sketches.fetch();

  $('form.sketch-details').on('submit', function(e){
    e.preventDefault();
    // var data = $('.etch-a-sketch');
    var artistField = $('form.sketch-details input.artist');
    var artist = artistField.val();
    var locationField = $('form.sketch-details input.location');
    var location = locationField.val();                       // add in default ip
    var tagsField = $('form.sketch-details input.tags');
    var tags = tagsField.val();
    tagsField.val('');
    var storyField = that.$el.find('.story')
    var story = storyField.val();
    storyField.val('');
    sketches.create({artist:artist, location:location, tags:tags, story:story})


  })
}
