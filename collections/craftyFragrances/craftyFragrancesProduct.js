Schema.craftyFragrancesProduct = new SimpleSchema({
   publish : {
       type : Boolean,
       defaultValue : false
   },
   name : {
       type : String,
       autoValue : function(){
           if(this.isInsert){
               return this.field("name");
           }
       }
   },
   description : {
       type : String,
       optional : true
   },    
});

Schema.craftyFragrancesInventory = new SimpleSchema({
   product : {
       type : String
   },
   available : {
       type : Boolean,
       defaultValue : false
   },
   price : {
       type : Number,
       defaultValue : 0
   }
});