Template.batches.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe('Batches');
    self.subscribe('Products');
  });
});

Template.batches.helpers({
    batches: function () {
      return Batches.find().fetch();
    },
    productName : function (id){
      product = Products.findOne(id);
      return product.name;
    }
});