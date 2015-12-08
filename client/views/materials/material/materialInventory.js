Template.materialInventory.helpers({
   'formatInventory' : function(){
      if(this.inventoryType == 'Kg'){
          return gToKg(this.inventory) + this.inventoryType;
      }else{
          return this.inventory + ' ' + this.inventoryType;
      }
   } 
});