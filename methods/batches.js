//Client Side Methods
Meteor.methods({
    formulationFor : function(product, batchSize){
        if(product && product != ''){
            var formulation = Formulations.findOne({product: product});
            //multiply ingredient percentage * required batch size
            _.each(formulation.ingredients, function(ingredient){
                ingredient.qty = ingredient.qty/100*batchSize;
            });
            return formulation;
        }
    }
});