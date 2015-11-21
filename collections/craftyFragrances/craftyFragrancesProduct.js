Schema.craftyFragrancesProduct = new SimpleSchema({
   publish : {
       type : Boolean,
       defaultValue : false
   },
   name : {
       type : String,
   },
   description : {
       type : String,
       optional : true
   },    
});

Schema.craftyFragrancesInventory = new SimpleSchema({
   available : {
       type : Boolean,
       defaultValue : false
   },
   price : {
       type : Number,
       defaultValue : 0
   }
});