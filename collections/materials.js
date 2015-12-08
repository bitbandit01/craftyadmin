Materials = new Meteor.Collection('materials');

Schema.SuppliedSize = new SimpleSchema({
    description : {
        type : String,
    },
    code : {
        type : String,
        optional : true
    },
    units : {
        type: Number,
        defaultValue : 1,
        min: 1,
    },
    minQty : {
        type: Number,
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
        defaultValue : 0,
        min : 0
    },
    inventoryType : {
        type : String,
        allowedValues : ['Kg', 'Units']
    },
    auditTrail : {
        type : [Object],
        defaultValue : []
    },
    'auditTrail.$.timestamp' : {
        type : Date
    },
    'auditTrail.$.event' : {
        type : String
    },
    allergens : {
        type : [String],
        optional : true,
        defaultValue : [],
    },
    hcodes : {
        type : [String],
        optional : true,
        defaultValue : [],
    },
    pictograms : {
        type : [String],
        optional : true,
        defaultValue : [],
    },
    suppliers : {
        type : [Object],
        optional : true
    },
    "suppliers.$._id" : {
        type : String,
    },
    "suppliers.$.name" : {
        type : String,
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