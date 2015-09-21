Inventory = new Meteor.Collection('inventory');

Inventory.attachSchema(new SimpleSchema({
   sku : {
     type : String,
     min : 0,
     max: 12,
     unique: true
   },
   product : {
     type : Object,
   },
  "product._id" : {
     type : String,
   },
  "product.name" : {
    type : String,
   },
   size  : {
     type : Object,
   },
   "size._id" : {
      type : String,
   },
   "size.description" : {
      type : String,
   },                                     
   gtin13 : {
     type : String,
     optional : true
   },
   inStock : {
     type : Number,
     defaultValue : 0
   },
   available : {
     type : Number,
     defaultValue : 0
   }
}));

Inventory.allow({
  insert : function(){
    return true;
  },
  update : function(){
    return true;
  }
});