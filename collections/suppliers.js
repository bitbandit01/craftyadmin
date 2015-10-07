Suppliers = new Meteor.Collection('suppliers');

Schema.AddressSchema = new SimpleSchema({
  description : {
    type : String,
  },
  line1 : {
    type : String,
  },
  line2 : {
    type : String,
    optional : true
  },
  line3 : {
    type : String,
    optional : true
  },
  town : {
    type : String
  },
  county : {
    type : String,
    optional : true
  },
  postcode : {
    type : String,
  },
  country : {
    type : String,
    allowedValues : ["United Kingdom", "Ireland"]
  },
  telephone : {
    type : String,
    optional : true
  }
});

Schema.SupplierSchema = new SimpleSchema({
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
    type : [Schema.AddressSchema],
    optional : true
  }
});

Suppliers.attachSchema(Schema.SupplierSchema);

Suppliers.allow({
  insert : function(){
    return true;
  },
  update : function(){
    return true;
  }
});