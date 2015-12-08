Template.receiveStockForm.onCreated(function(){
   inventoryType = new ReactiveVar('Units');
});

Template.receiveStockForm.helpers({
    materials : function(){
        var materials = Materials.find();
        return materials;
    },
    inventoryType : function(){
        return inventoryType.get();
    }
});

Template.receiveStockForm.events({
   'change select[name=material]' : function(e){
        var code = $('select[name=material] option').filter(":selected").val();
        var material = Materials.findOne({code : code});
        if(material){
             inventoryType.set(material.inventoryType);
        }else{
             inventoryType.set('Units');
        }  
   },
   'submit #receiveStockForm' : function(e){
       e.preventDefault();
       var code = $('select[name=material] option').filter(":selected").val();
       var qty = $('input[name=qty]').val();
       Meteor.call('incMaterialInventory', code, parseInt(qty));
   } 
});