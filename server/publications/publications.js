Meteor.publish('Products', function(){
    return Products.find();
});

Meteor.publish('aProduct', function(code){
    return Products.find({code : code});
});

Meteor.publish('Inventory', function(){
    return Inventory.find();
});

Meteor.publish('productInventory', function(code){
    return Inventory.find({'product.code' : code});
});

Meteor.publish('Formulations', function(){
    return Formulations.find();
});

Meteor.publish('productFormulations', function(code){
    return Formulations.find({'product' : code});
});

Meteor.publish('Allergens', function(){
    return Allergens.find();
  
});

Meteor.publish('HCodes', function(){
    return HCodes.find();
});

Meteor.publish('Pictograms', function(){
    return Pictograms.find();
});

Meteor.publish('Sizes', function(){
   return Sizes.find({}, {sort : {weight: 1}});
});

Meteor.publish('Materials', function(){
  return Materials.find();
});

Meteor.publish('aMaterial', function(code){
   return Materials.find({code : code});
});

Meteor.publish('Suppliers', function(){
  return Suppliers.find();
});

Meteor.publish('aSupplier', function(id){
  return Suppliers.find({_id : id});
});

Meteor.publish('Batches', function(){
  return Batches.find({}, {sort : {startTime : -1}});
});

Meteor.publish('Purchases', function(){
   return Purchases.find();
});

Meteor.publish('CraftyCart', function(){
    return CraftyCart.find();
});