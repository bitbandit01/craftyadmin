Suppliers = new Meteor.Collection('suppliers');

var Schema = {};

Schema.supplierSchema = new SimpleSchema({
  name : {
    type: String
  },
  website : {
    type : String,
    optional : true
  },
  telephone : {
    type : [String],
    optional : true
  },
  email : {
    type : [Object],
    optional : true
  },
  "email.$.name" : {
    type: String,               
  },
  "email.$.address" : {
    type : String,
    regEx : SimpleSchema.RegEx.Email
  },
  "email.$.department" : {
    type : String,
    optional : true
  },
  addresses : {
    type : [Object],
    optional : true
  },
  "addresses.$.description" : {
    type : String,
  },
  "addresses.$.line1" : {
    type : String,
  },
  "addresses.$.line2" : {
    type : String,
    optional : true
  },
  "addresses.$.line3" : {
    type : String,
    optional : true
  },
  "addresses.$.town" : {
    type : String
  },
  "addresses.$.county" : {
    type : String,
    optional : true
  },
  "addresses.$.postcode" : {
    type : String,
  },
  "addresses.$.country" : {
    type : String,
    allowedValues : ["United Kingdom", "Ireland"]
  },
  "addresses.$.telephone" : {
    type : String,
    optional : true
  }
});

Suppliers.attachSchema(Schema.supplierSchema);

Suppliers.allow({
  insert : function(){
    return true;
  },
  update : function(){
    return true;
  }
});