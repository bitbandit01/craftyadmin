Meteor.methods({
   updateProductInventory : function(objArray){
       //Check all the values before doing any updates
       _.each(objArray, function(record){
          check(record.value, Match.Integer);
       });
       _.each(objArray, function(record){
          Inventory.update({_id: record._id}, {$set : {inStock : record.value}});
       });
   }
});