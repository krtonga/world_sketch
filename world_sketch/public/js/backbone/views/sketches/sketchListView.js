var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.Views.SketchListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'all', this.render)
  },
  render: function(){
    var that = this;
    this.$el.empty();
    _.each(this.collection.models, function(sketch){
      var sketchView = new Sketcher.Views.SketchView({model: sketch });
      that.$el.append( sketchView.render().el )
    })
    return this;
  }
});
