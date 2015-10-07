Materials = new Meteor.Collection('materials');

Schema.SuppliedSize = new SimpleSchema({
    _id : {
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
    description : {
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
    units : {
        type: Number,
        label : 'Units per pack',
        defaultValue : 1,
        min: 1,
        optional : true
    },
    minQty : {
        type: Number,
        label : 'Minimum Order Qty',
        defaultValue : 1,
        min: 1
    },
});

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
        decimal: true,
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
        type : [Schema.SuppliedSize],
    },
});

Materials.attachSchema(Schema.MaterialSchema);

Materials.allow({
    insert : function(){
        return true;
    },
    update : function(){
        return true;
    }
});