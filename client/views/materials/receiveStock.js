Template.receiveStock.onCreated(function(){
   var self = this;
   self.autorun(function(){
      self.subscribe('Materials'); 
   });
});

Template.receiveStock.helpers({
    materials : function(){
        var materials = Materials.find().fetch();
        return materials;
    }
});

Template.receiveStock.events({
   'submit #receiveInventory' : function(e){
       e.preventDefault();
       var id = $('select[name=material]').val();
       var qty = $('input[name=qty]').val();
       console.log(id, qty);
       var obj = {
           '_id' : id,
           'qty' : parseInt(qty)
       };
       Meteor.call('addMaterialInventory', obj, function(err, res){
           if(err){
               console.log(err);
           }else{
               console.log(res);
           }
       });
   } 
});