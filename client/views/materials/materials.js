Template.materials.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('Materials');
     self.subscribe('Suppliers');
     self.subscribe('Sizes');
  });
});

Template.materials.helpers({
  materials : function(){
    return Materials.find().fetch();
  }
});