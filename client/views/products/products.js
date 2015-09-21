Template.products.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('Products');
  });
});

Template.products.helpers({
    products: function () {
      return Products.find().fetch();
    },
});