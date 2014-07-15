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

  bab = new Sketcher.Models.Sketch({data: '<div class=​"etch-a-sketch">​<svg><line x1=​"102.90277862548828" y1=​"80.376708984375" x2=​"102.5" y2=​"79" style=​"stroke-width:​ 40px;​ stroke:​ yellow;​">​</line>​<circle cx=​"102.5" cy=​"79" r=​"20" style=​"fill:​ rgb(255, 255, 0)​;​">​</circle>​<line x1=​"102.5" y1=​"79" x2=​"104" y2=​"76.5" style=​"stroke-width:​ 40px;​ stroke:​ yellow;​">​</line>​<circle cx=​"104" cy=​"76.5" r=​"20" style=​"fill:​ rgb(255, 255, 0)​;​">​</circle>​</svg></div>',
                                    artist:'Bob',
                                    location: 'NY',
                                  })
  babView = new Sketcher.Views.SketchView({model: bab});
  sketches.add(bab)
  sketches.add({artist: 'Miss'})
};

$(function(){
  console.log('inch by inch... row by row...')
  Sketcher.initialize();
})
