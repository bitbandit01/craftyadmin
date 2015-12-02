SyncedCron.add({
    name: 'Sync product data with Crafty Fragrances',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 2 minutes');
    },
    job: function() {
        var sinceLast = moment().subtract(2, 'minutes').format();
        //Get products which have been updated in the last 35 minutes
        var products = Products.find({updatedAt : {$gte : new Date(sinceLast)}}).fetch();
        var api = new craftyAPI();
        _.each(products, function(product){
            api.updateProduct(product);
        });
        //Get inventory which have been updated in the last 35 minutes
        var inventory = Inventory.find({updatedAt : {$gte : new Date(sinceLast)}}).fetch();
        _.each(inventory, function(item){
            api.updateVariant(item);
        });
    }
});

craftyAPI = function(){
    this.getProduct = function(code){
        try{
            var res = Meteor.http.call('GET', 'http://meteor-100482.nitrousapp.com:3000/api/v1/products/'+code, {
                headers : {
                    'x-auth-token' : 'Y291GZl3RHfKzm9F3Sc5ERK3lG1Vyu87'
                }
            });
            return res;
        }catch(e){
            console.log("Error when attempting to fetch product : " + code + e);
            return false;
        }
    };

    this.getVariant = function(sku){
        try{
            var res = Meteor.http.call('GET', 'http://meteor-100482.nitrousapp.com:3000/api/v1/inventory/'+sku, {
                headers : {
                    'x-auth-token' : 'Y291GZl3RHfKzm9F3Sc5ERK3lG1Vyu87'
                }
            });
            return res;
        }catch(e){
            console.log("Error when attempting to fetch variant : " + code + e);
            return false;
        }
    };
    
    this.updateProduct = function(product){
        //check if the product already exists on the api
        var check = this.getProduct(product.code);
        if(check){
            //Product does exist so do a PUT with the new details
            try{
                //API Expects a Product Object
                var data = {
                        name : product.channels.craftyFragrances.name,
                        description : product.channels.craftyFragrances.description,
                        publish : product.channels.craftyFragrances.publish
                    };
                var res = Meteor.http.call('PUT', 'http://meteor-100482.nitrousapp.com:3000/api/v1/products/'+product.code, {
                    data : data,
                    headers : {
                        'x-auth-token' : 'Y291GZl3RHfKzm9F3Sc5ERK3lG1Vyu87'
                    }
                });
                console.log("Successfully updated product : " + product.code);
                return res;
            }catch(e){
                console.log("Error when attempting to update product : " + product.code + e);
                return false;
            }
        }else{
            //Product doesnt exist so do a POST with the new details
            try{
                //API Expects an array of Products
                var data = [{
                        name : product.channels.craftyFragrances.name,
                        code : product.code,
                        description : product.channels.craftyFragrances.description,
                        publish : product.channels.craftyFragrances.publish
                }];
                var res = Meteor.http.call('POST', 'http://meteor-100482.nitrousapp.com:3000/api/v1/products', {
                    data : data,
                    headers : {
                        'x-auth-token' : 'Y291GZl3RHfKzm9F3Sc5ERK3lG1Vyu87'
                    }
                });
                console.log("Successfully created product : " + product.code);
                return res;
            }catch(e){
                console.log("Error when attempting to create product : " + product.code + e);
                return false;
            }
        }

    };

    this.updateVariant = function(variant){
        //check if the product already exists on the api
        var check = this.getVariant(variant.sku);
        if(check){
            //Variant does exist so do a PUT with the new details
            try{
                //API Expects a Variant Object
                var data = {
                    size : variant.size.description,
                    product : variant.product.code,
                    gtin13 : variant.gtin13,
                    inStock : variant.inStock,
                    price : variant.channels.craftyFragrances.price,
                    available : variant.channels.craftyFragrances.available
                };
                var res = Meteor.http.call('PUT', 'http://meteor-100482.nitrousapp.com:3000/api/v1/inventory/'+variant.sku, {
                    data : data,
                    headers : {
                        'x-auth-token' : 'Y291GZl3RHfKzm9F3Sc5ERK3lG1Vyu87'
                    }
                });
                console.log("Successfully updated variant : " + variant.sku);
                return res;
            }catch(e){
                console.log("Error when attempting to update variant : " + variant.sku + e);
                return false;
            }
        }else{
            //Variant doesnt exist so do a POST with the new details
            try{
                //API Expects an array of Variants
                var data = [{
                    sku : variant.sku,
                    size : variant.size.description,
                    product : variant.product.code,
                    gtin13 : variant.gtin13,
                    inStock : variant.inStock,
                    price : variant.channels.craftyFragrances.price,
                    available : variant.channels.craftyFragrances.available
                }];
                var res = Meteor.http.call('POST', 'http://meteor-100482.nitrousapp.com:3000/api/v1/inventory', {
                    data : data,
                    headers : {
                        'x-auth-token' : 'Y291GZl3RHfKzm9F3Sc5ERK3lG1Vyu87'
                    }
                });
                console.log("Successfully created variant : " + variant.sku);
                return res;
            }catch(e){
                console.log("Error when attempting to update variant : " + variant.sku + e);
                return false;
            }
        }

    };

};