Products = new Meteor.Collection('products');

var productSchema = new SimpleSchema({
    name : {
        type : String
    },
    code : {
        type : String,
        unique : true
    },
    productType : {
        type : String,
        allowedValues : ['Manufactured', 'Resale', 'Composite']
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date();
        }
    },
    allergens : {
        type : [String],
        optional : true
    },
    hcodes : {
        type : [String],
        optional : true
    },
    pictograms : {
        type : [String],
        optional : true
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
    channels : {
        type : Object,
    },
    'channels.craftyFragrances' : {
        type : Schema.craftyFragrancesProduct
    }


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