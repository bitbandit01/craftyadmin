Template.suppliers.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('Suppliers');
  });
});

Template.suppliers.helpers({
  'suppliers' : function(){
    return Suppliers.find().fetch();
  },
});