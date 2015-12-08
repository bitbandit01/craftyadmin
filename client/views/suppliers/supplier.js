Template.supplier.onCreated(function(){
  var self = this;
  self.autorun(function() {
     var supplier = FlowRouter.getParam("id");
     self.subscribe('aSupplier', supplier);
  });
});

Template.supplier.helpers({
  'supplier' : function(){
    return Suppliers.findOne();
  }
})