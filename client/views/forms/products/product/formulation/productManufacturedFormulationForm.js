Template.productManufacturedFormulationForm.onCreated(function(){
    ingredientCounter = new ReactiveVar(1); 
});

Template.productManufacturedFormulationForm.onRendered(function(){
    var rules = {};
    //Hack to validate 20 ingredients
    for(var i=1; i<11; i++){
        rules["ingredient"+i] = {
            required : true
        };
        rules["qty"+i] = {
            required : true,
            min : 0
        };
    }
    rules["instructions"] = {
        required : false
    };
    $("#productManufacturedFormulationForm").validate({
        rules: rules
    }); 
});

Template.productManufacturedFormulationForm.helpers({
    formRows : function(){
        var counter = ingredientCounter.get();
        var arr = [];
        for(var i=1; i<counter+1; i++){
            arr.push(i);
        }
        return arr;
    },
    ingredients : function() {
        var materials = Materials.find({inventoryType : 'Kg'}).fetch();
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

Template.productManufacturedFormulationForm.events({
   'click #addFormRow' : function(e){
       e.preventDefault();
       var curr = ingredientCounter.get();
       ingredientCounter.set(curr+1);
   },
   'click #removeFormRow' : function(e){
       e.preventDefault();
       var curr = ingredientCounter.get();
       if(curr > 1){
           ingredientCounter.set(curr-1);
       }       
   },
   'submit #productManufacturedFormulationForm' : function(e){
       e.preventDefault();
       var product = FlowRouter.getParam("code");
       var counter = ingredientCounter.get();
       var instructions = $("textarea[name=instructions]").val();
       var data = {
           ingredients : [],
           instructions : instructions
       };
       for(var i = 1; i < counter+1; i++){
           var ingredient = $("select[name=ingredient"+i+"] option").filter(":selected").val();
           var qty = $("input[name=qty"+i+"]").val();
           data.ingredients.push({
               code : ingredient,
               qty : kgToG(qty)
           });
       }
       Meteor.call('addProductFormulation', product, data);
       //Reset the form
       ingredientCounter.set(1);
       $(e.target).trigger("reset");
   }
});