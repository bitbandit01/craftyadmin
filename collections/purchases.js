Purchases = new Meteor.Collection('purchases');

Schema.PurchaseSchema = new SimpleSchema({
    number : {
       type : String,
    },
    supplier : {
        type : Schema.SupplierSchema,
        blackbox : true
    },
    lineItems : {
        type : [Object]
    },
    status : {
        type : String,
        allowedValues : ['Draft', 'Confirmed'],
        defaultValue : 'Draft'
    },
    'lineItems.$.material' : {
        type : Object,
    },
    'lineItems.$.material._id' : {
        type : String,
    },
    'lineItems.$.material.name' : {
        type : String,
    },
    'lineItems.$.size' : {
        type : Schema.SuppliedSize,
    },
    'lineItems.$.qty' : {
        type : Number,
    },
    'lineItems.$.status' : {
        type : String,
        allowedValues : ['Pending', 'Received', 'Defect'],
        defaultValue : 'Pending'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
          if (this.isUpdate) {
            return new Date();
          }
        },
        denyInsert: true,
        optional: true
    },
});

Purchases.attachSchema(Schema.PurchaseSchema);

Purchases.allow({
    insert : function(){
        return true;
    },
    update : function(){
        return true;
    }
});

SimpleSchema.debug = true;