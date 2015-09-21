Template.supplier.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('Suppliers');
  });
});

Template.supplier.helpers({
  'supplier' : function(){
    var id = FlowRouter.getParam('id');
    return Suppliers.findOne(id);
  }
})