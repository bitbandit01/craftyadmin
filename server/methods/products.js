Meteor.methods({
   'createProduct' : function(data){
       check(data, Object);
       Products.insert(data);
       Meteor.call('addProductAuditItem', data.code, "Product '" + data.name + "' was created");
   },
   'updateProductName' : function(code, name){
       check(code, String);
       check(name, String);
       //Retrieve the old name
       var old = Products.findOne({code : code}).name;
       //Update the product record
       Products.update({code : code}, {$set : {name : name}});
       //Update any inventory records for this product
       Inventory.update({'product.code' : code}, {$set : {'product.name' : name}}, {multi: true});
       Meteor.call('addProductAuditItem', code, "Name was changed from '" +old+ "' to '"+name+"'" );
       return true;
   },
   'addProductSize' : function(code, obj){
       check(code, String);
       check(obj, {
           size : String,
           gtin13 : String
       });
       var product = Products.findOne({code : code});
       var size = Sizes.findOne(obj.size);
       var data = {
           sku : code + '-' + size.code,
           product : {
               _id : product._id,
               code : product.code,
               name : product.name
           },
           size : {
               _id : size._id,
               description : size.description
           },
           gtin13 : obj.gtin13,
           inStock : 0,
           available : 0,
           channels : {
               craftyFragrances : {
                   product : product.code,
                   available : false,
                   price : 0
               }
           }
       };
       //Add new Inventory record
       Inventory.insert(data);
       Meteor.call('addProductAuditItem', code, 'Product Size '+size.description+' was added');
   },
   'addProductFormulation' : function(code, obj){
       check(code, String);
       check(obj, Object);
       var data = {};
       data["product"] = code;
       data["instructions"] = obj.instructions;
       data["ingredients"] = [];
       _.each(obj.ingredients, function(ingredient){
          var material = Materials.findOne({code : ingredient.code});
          data.ingredients.push({
             code : ingredient.code,
             name : material.name,
             qty : ingredient.qty
          });
       });
       Formulations.insert(data);
       Meteor.call('addProductAuditItem', code, 'New Formulation was added');
   },
   'addProductAuditItem' : function(code, string){
       var date = new Date;
       // Record user id / name
       var obj = {
           timestamp : date,
           event : string
       };
       Products.update({code : code}, {$push : {auditTrail : obj}});
   }
});