var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.Models.Sketch = Backbone.Model.extend({
  defaults: {
    // data: "",
    artist: "anonymous",
    location: "",
    tags: "",
    // created_at: "",
    // updated_at: "",
    story: ""
  }
});
