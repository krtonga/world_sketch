var Sketcher = Sketcher || {Models: {}, Collections: {}, Views: {} };

Sketcher.Views.SketchView = Backbone.View.extend({
  initialize: function(){
    // this.listenTo(this.model, 'destroy', this.remove)
    this.listenTo(this.model, 'all', this.render)
  },
  template: _.template( $('.sketch-template').html() ),
  // editTemplate: _.template( $('.edit-monkey-template').html() ),
  render: function(){
    this.$el.html( this.template( this.model.attributes ));
    return this;
  },
  // events:{
  //   'click [data-action="delete"]' : 'deleteSketch',
  //   'click [data-action="edit"]' : 'renderEditForm',
  // },
  // deleteSketch: function(){
  //   this.model.destroy();
  //   return this;
  // },
  // renderEditForm: function(){
  //   var that = this;
  //   this.$el.html( this.editTemplate( this.model.attributes ))
  //   this.$el.find('form').on('submit', function(e){
  //     e.preventDefault();
  //     // var dataField = that.$el.find('.etch-a-sketch')
  //     var artistField = that.$el.find('.artist')
  //     var updatedArtist = artistField.val();
  //     that.model.set('artist', updatedArtist);
  //     var locationField = that.$el.find('.location');
  //     var updatedLocation = locationField.val();
  //     that.model.set('location', updatedLocation);
  //     var tagsField = that.$el.find('.tags')
  //     var updatedTags = tagsField.val();
  //     that.model.set('group', updatedTags);
  //     var storyField = that.$el.find('.story')
  //     var updatedStory = storyField.val();
  //     that.model.set('story', updatedStory);
  //     that.model.save();
  //   })
  //   return this;
  // }
});
