Template.sizes.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('Sizes');
  });
});

Template.sizes.helpers({
  sizes : function(){
    return Sizes.find({}, {$sort : {weight : 1}});
  }
});