Template.productCompositeFormulationForm.onCreated(function(){
    ingredientCounter = new ReactiveVar(1);
    var self = this;
    self.autorun(function(){
       self.subscribe('Products'); 
       self.subscribe('Inventory');
    });
});

Template.productCompositeFormulationForm.onRendered(function(){
    var rules = {};
    //Hack to validate 20 ingredients
    for(var i=1; i<22; i++){
        rules["product"+i] = {
            required : true
        };
        rules["size"+i] = {
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
    $("#productCompositeFormulationForm").validate({
        rules: rules
    }); 
});

Template.productCompositeFormulationForm.helpers({
    formRows : function(){
        var counter = ingredientCounter.get();
        var arr = [];
        for(var i=1; i<counter+1; i++){
            arr.push(i);
        }
        return arr;
    },
    products : function() {
        var code = FlowRouter.getParam("code");
        //All Products except this one
        var products = Products.find({code : {$ne: code}}).fetch();
        var arr = [];
        _.each(products, function(product){
            arr.push(
                {
                    value : product.code,
                    label : product.name
                }
            );
        });
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
    }
});

Template.productCompositeFormulationForm.events({
   'change select.product-picker' : function(e){
       e.preventDefault();
       var product = $("select[name=product"+this+"] option").filter(":selected").val();
        if(product){
            var inventory = Inventory.find({'product.code' : product}).fetch();
            var options = "<option disabled selected>Select One</option>\n";
            _.each(inventory, function(item){
                options += '<option value="'+item.sku+'">'+item.size.description+'</option>\n';
            });
            $("select[name=size"+this+"]").html(options);
        }
   },
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
   'submit #productCompositeFormulationForm' : function(e){
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