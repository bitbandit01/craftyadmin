Meteor.methods({
    updateInventory : function(){
        var inventory = Inventory.find().fetch();
        _.each(inventory, function(item){
            //Async method call we need to wait for result of
            var callSync= Meteor.wrapAsync(Meteor.call);
            var max = callSync('formulationMaxAvailable', item.product.code);
            var size = Sizes.findOne({_id : item.size._id});
            var available = Math.floor(max/size.weight);
            //Perform the update if the value has changed
            if(item.available != available){
                Inventory.update({_id : item._id}, {$set : {available : available}});    
            }
        });
    },
    formulationMaxAvailable : function(code){
        //Determines the maximum qty of a product that can be produced
        //based on its currently set formulation
        var product = Products.findOne({code : code});
        var formulation = Formulations.findOne({product: code});
        if(!formulation){
            return 0;
        }
        var available = [];
        //Calculate whats available for each particular ingredient
        _.each(formulation.ingredients, function(ingredient){
            var material = Materials.findOne({code : ingredient.code});
            switch(product.productType) {
                case 'Manufactured' : 
                    //convert to grams
                    var inventory = material.inventory;
                    //grams for 1Kg
                    var requirement = (ingredient.qty/100);
                    //round down and return in g
                    available.push(Math.floor(kgToG(inventory/requirement)));
                    break;
                case 'Resale' : 
                    available.push(Math.floor(material.inventory/ingredient.qty));
                    break;
                case 'Composite' :
                    //Not implemented yet
                    available.push(0);
                    break;
            }
        });
        //The actual available will be the lowest of the values
        return Math.min.apply(null, available);
    },
});

