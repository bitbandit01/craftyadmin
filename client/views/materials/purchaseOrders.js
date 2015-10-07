Template.purchaseOrders.onCreated(function(){
   var self = this;
   self.autorun(function(){
      self.subscribe('Materials');
      self.subscribe('Sizes');
      self.subscribe('Inventory');
      self.subscribe('Suppliers');
      self.subscribe('Purchases'); 
   });
});

Template.purchaseOrders.helpers({
   purchaseOrders : function(){
       return Purchases.find().fetch();
   } 
});