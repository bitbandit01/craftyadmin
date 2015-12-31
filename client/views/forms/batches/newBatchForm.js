Template.newBatchForm.onCreated(function(){
    currProduct = new ReactiveVar(undefined);
    batchSize = new ReactiveVar(0);
    available = new ReactiveVar(0);
});

jQuery.validator.addMethod('batchWithinLimits', function(value, elem){
    return value <= available.get();
});

Template.newBatchForm.onRendered(function(){
    $("#newBatchForm").validate({
        rules: {
            product: {
                required: true,
            },
            batchSize: {
                required: true,
                min : 1,
                batchWithinLimits : true
            }
        },
        messages : {
            product : "Please choose a product",
            batchSize : {
                required : "Plese enter a batch size",
                min : "Batch Size must be 1 or more",
                batchWithinLimits : "Batch Size cannot be greater than the available stock value"
            },
        }
    });
});

Template.newBatchForm.helpers({
    products : function(){
        var options = [];
        var products = Products.find({productType : 'Manufactured'}).fetch();
        _.each(products, function(product){
            options.push({value: product.code, label : product.name});
        });
        return options;
    },
    available : function(){
        return available.get();
    },
    formulationFor : function() {
        return batchSize.get();
    },
    formulationAdjusted : function(){
        var size = batchSize.get();
        var product = currProduct.get();
        console.log(product);
        if(product && product != ''){
           var formulation = Formulations.findOne({product: product});
          //multiply ingredient percentage * required batch size
           _.each(formulation.ingredients, function(ingredient){
             ingredient.qty = ingredient.qty/100*size;
           });
          return formulation;
        }
  }
});

Template.newBatchForm.events({
    'change select[name=product]' : function(e){
        var product = $("select[name=product] option").filter(":selected").val();
        currProduct.set(product);
        Meteor.call('formulationMaxAvailable', product, function(error, data){
            if(!error){
                available.set(gToKg(data));
            }else{
                console.log(error);
                available.set(0);
            }
       });
    },
    'change input[name=batchSize]' : function(e){
        var val = $(e.target).val();
        batchSize.set(val);
    }
});