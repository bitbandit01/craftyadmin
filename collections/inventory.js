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
    "product.code" : {
        type : String,
    },
    "product.name" : {
        type : String
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
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date();
        }
    },
    channels : {
        type : Object
    },
    'channels.craftyFragrances' : {
        type : Schema.craftyFragrancesInventory
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