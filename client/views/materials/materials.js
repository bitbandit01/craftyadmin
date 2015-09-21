Template.materials.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('Materials');
  });
});

Template.materials.helpers({
  materials : function(){
    return Materials.find().fetch();
  }
});