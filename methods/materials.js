Meteor.methods({
   addMaterialInventory : function(obj){
       check(obj.qty, Number);
       var qty = kgToG(obj.qty);
       var res = Materials.update({_id : obj._id}, {$inc : {inventory : qty}});
       console.log(res);
       return res;
   } 
});