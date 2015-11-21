Meteor.publish('Products', function(){
    return Products.find();
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

Meteor.publish('Inventory', function(){
  return Inventory.find();
});

Meteor.publish('Materials', function(){
  return Materials.find();
});

Meteor.publish('Suppliers', function(){
  return Suppliers.find();
});

Meteor.publish('Formulations', function(){
  return Formulations.find();
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