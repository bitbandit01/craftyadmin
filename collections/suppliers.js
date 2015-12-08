Suppliers = new Meteor.Collection('suppliers');

Schema.AddressSchema = new SimpleSchema({
  address1 : {
    type : String,
  },
  address2 : {
    type : String,
    optional : true
  },
  address3 : {
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
    optional :true
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
  contacts : {
      type : [Object]
  },
  "contacts.$.name" : {
      type : String
  },
  "contacts.$.email" : {
      type : String,
      optional : true
  },
  "contacts.$.telephone" : {
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