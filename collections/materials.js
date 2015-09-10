Materials = new Meteor.Collection('materials');

Schema = {};

Schema.MaterialSchema = new SimpleSchema({
  name : {
    type : String
  },
  code : {
    type : String,
    unique : true
  },
  inventory : {
    type : Number,
    defaultValue : 0,
    min : 0
  },
  allergens : {
    type : [String],
    optional : true,
    defaultValue : [],
    autoform : {
      omit : true
    }
  },
  hcodes : {
    type : [String],
    optional : true,
    defaultValue : [],
    autoform : {
      omit : true
    }
  },
  pictograms : {
    type : [String],
    optional : true,
    defaultValue : [],
    autoform : {
      omit : true
    }
  },
  suppliers : {
    type : [Object],
    optional : true
  },
  "suppliers.$._id" : {
    type : String,
    label : "Supplier",
    autoform : {
      afFieldInput : {
        options : function(){
          var options = [];
          Suppliers.find().fetch().forEach(function(record){
            options.push({
              label : record.name, value : record._id
            })
          });
          return options;
        }
      }
    }
  },
  "suppliers.$.name" : {
    type : String,
    autoValue : function(){
      var id = this.siblingField('_id').value;
      var record = Suppliers.findOne(id);
      return record.name;
    },
    autoform : {
      omit : true
    }
  },
  "suppliers.$.code" : {
    type : String,
    optional : true,
    label : "Supplier's product code"
  },
  "suppliers.$.sizes" : {
    type : [Object],
  },
  "suppliers.$.sizes.$._id" : {
    type : String,
    label : "Size",
    autoform : {
      afFieldInput : {
        options : function(){
          var options = [];
          Sizes.find().fetch().forEach(function(record){
            options.push({
              label : record.description, value : record._id
            })
          });
          return options;
        },
      }
    }
  },
  "suppliers.$.sizes.$.description" : {
    type : String,
    autoValue : function(){
      var id = this.siblingField('_id').value;
      console.log(id);
      var record = Sizes.findOne(id);
      return record.description;
    },
    autoform : {
      omit : true
    }
  },
  "suppliers.$.sizes.$.price" : {
    type : Number,
    decimal : true,
    min : 0.00
  },
  "suppliers.$.sizes.$.priceBreaks" : {
    type : [Object],
    optional : true
  },
  "suppliers.$.sizes.$.priceBreaks.$.qty" : {
    type : Number
  },
  "suppliers.$.sizes.$.priceBreaks.$.price" : {
    type : Number,
    decimal : true,
    min : 0.00
  }
});

Materials.attachSchema(Schema.MaterialSchema);