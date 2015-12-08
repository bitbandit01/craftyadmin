//Client Side Methods
Meteor.methods({
    formulationMaxAvailable : function(code){
        //Determines the maximum qty of a product that can be produced
        //based on its currently set formulation
        var formulation = Formulations.findOne({product: code});
        if(!formulation){
            return 0;
        }
        var available = [];
        //Calculate whats available for each particular ingredient
        _.each(formulation.ingredients, function(ingredient){
            var material = Materials.findOne({code : ingredient.code});
            //convert to grams
            var inventory = material.inventory;
            console.log(inventory);
            //grams for 1Kg
            var requirement = (ingredient.qty/100);
            console.log(requirement);
            //round down
            available.push(Math.floor(inventory/requirement));
        });
        //The actual available will be the lowest of the values
        return Math.min.apply(null, available);
    },
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

//Server Only Methods
if(Meteor.isServer){

    Meteor.methods({
        startNewBatch : function(doc){
            var product = Products.findOne(doc.product);
            if(!product){
                throw new Meteor.Error('400', 'Product not found');
            }
            //Async method call we need to wait for result of
            var callSync= Meteor.wrapAsync(Meteor.call);
            var formulation = callSync('formulationFor', product._id, doc.batchSize);

            doc.remaining = doc.batchSize = kgToG(doc.batchSize);
            var batch = product.code + '-' + moment().format('X');
            _.extend(doc, {
                batchNo: batch,
                startTime : new Date(),
                status : 'Incomplete',
                formulation : formulation._id,
                ingredients : formulation.ingredients,
                inventory : []
            });

            var id = Batches.insert(doc);
            if(id) {
                //Remove the inventory for each ingredient so it cant be used more than once
                _.each(formulation.ingredients, function(ingredient){
                    var increment = kgToG(ingredient.qty);
                    Materials.update({_id : ingredient._id}, {$inc : {inventory: -increment}});
                });
            }
            return id;
        },
        assignStock : function(doc){
            var item = Inventory.findOne(doc.size);
            var batch = Batches.findOne(doc.batch);
            var size = Sizes.findOne(item.size._id);
            if(batch.remaining < doc.qty*size.weight){
                throw new Meteor.Error('400', 'Not enough stock left');
            }
            var data = {
                '_id' : doc.size,
                'sku' : item.sku,
                'description' : item.size.description,
                'qty' : doc.qty
            };
            //Check if the size has previously been assigned
            var pos = batch.inventory.map(function(e) { return e._id}).indexOf(doc.size);
            if(pos === -1){
                Batches.update({_id : doc.batch}, {$push : {inventory : data}});
            }else{
                //Increment the qty field for the inventory item
                Batches.update({_id : doc.batch, 'inventory._id' : doc.size}, {$inc : {'inventory.$.qty' : data.qty}});
            }

            Batches.update({_id : doc.batch}, {$inc : {remaining : -doc.qty*size.weight}});
            Inventory.update({_id : doc.size}, {$inc: {inStock : data.qty}});
            return doc;
        }
    });
}