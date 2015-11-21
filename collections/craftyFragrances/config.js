CraftyCart = new Meteor.Collection('craftyCart');

Schema.craftyCart = new SimpleSchema({
   apikey : {
     type : String
   },
   coupons : {
       type : Object,
   },    
   'coupons.apiEndpoint' : {
       type : String,
   },
   'coupons.values' : {
       type : [Object]
   },
   'coupons.values.$.description' : {
       type : String
   },
   'coupons.values.$.coupon' : {
       type : String
   },
   'coupons.values.$.value' : {
       type : Number,
       min : 1,
       max : 100
   },
   orders : {
       type : Object,
   },
   'orders.apiEndpoint' : {
       type : String,
   },
   products : {
       type : Object,
   },
   'products.apiEndpoint' : {
       type : String
   }
});

CraftyCart.attachSchema(Schema.craftyCart);