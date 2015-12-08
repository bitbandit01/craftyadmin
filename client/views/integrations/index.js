Template.craftyCart.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('CraftyCart');
  });
});

Template.craftyCart.helpers({
   coupons : function(){
       var data = CraftyCart.findOne().coupons.values;
       return data;
   } 
});