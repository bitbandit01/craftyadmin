Template.materials.onCreated(function(){
  var self = this;
  self.autorun(function() {
     self.subscribe('Materials');
  });
});

Template.materials.helpers({
    materials : function(){
        return Materials.find({}, {$orderBy : {name : -1}});
    },
    formatInventory : function(){
        if(this.inventoryType == 'Kg'){
            return gToKg(this.inventory) + this.inventoryType;
        }else{
            return this.inventory + ' ' + this.inventoryType;
        }
    }
});