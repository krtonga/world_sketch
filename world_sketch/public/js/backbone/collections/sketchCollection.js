var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.Collections.SketchCollection = Backbone.Collection.extend({
  model: Sketcher.Models.Sketch,
  url: '/sketches'
});
