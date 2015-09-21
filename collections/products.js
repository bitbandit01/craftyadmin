Products = new Meteor.Collection('products');

var productSchema = new SimpleSchema({
  name : {
    type : String
  },
  code : {
    type : String,
    unique : true
  },
  allergens : {
    type : [String],
    optional : true,
    autoform : {
      omit : true
    }
  },
  hcodes : {
    type : [String],
    optional : true,
    autoform : {
      omit : true
    }
  },
  pictograms : {
    type : [String],
    optional : true,
    autoform : {
      omit : true
    }
  },
  
});

Products.attachSchema(productSchema);

Products.allow({
  insert : function(){
    return true;
  },
  update : function(){
    return true;
  }
});