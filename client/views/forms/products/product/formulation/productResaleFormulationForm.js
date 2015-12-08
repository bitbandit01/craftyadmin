Template.productResaleFormulationForm.onRendered(function(){
    $("#productResaleFormulationForm").validate({
        rules: {
            ingredient : {
                required : true
            }
        }
    }); 
});

Template.productResaleFormulationForm.helpers({
    ingredients : function() {
        var materials = Materials.find({inventoryType : 'Units'}).fetch();
        var arr = [];
        _.each(materials, function(ingredient){
            arr.push(
                {
                    value : ingredient.code,
                    label : ingredient.name
                }
            );
        });
        return arr;
    },
});

Template.productResaleFormulationForm.events({
   'submit #productResaleFormulationForm' : function(e){
       e.preventDefault();
       var product = FlowRouter.getParam("code");
       var ingredient = $("select[name=ingredient] option").filter(":selected").val();
       var data = {
           ingredients : [
               {
                   code : ingredient,
                   qty : 1
               }
           ]
       };
       console.log(data);
       Meteor.call('addProductFormulation', product, data);
       //Reset the form
       $(e.target).trigger("reset");
   }
});