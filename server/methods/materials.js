Meteor.methods({
   'createMaterial' : function(data){
       check(data, Object);
       Materials.insert(data);
       Meteor.call('addMaterialAuditItem', data.code, "Material '" + data.name + "' was created");
   },
   'incMaterialInventory' : function(code, amt){
       check(code, String);
       check(amt, Match.Integer);
       var material = Materials.findOne({code : code});
       var received = amt;
       if(material.inventoryType == 'Kg'){
           var received = kgToG(amt);
       }
       //Update the material record
       Materials.update({code : code}, {$inc : {inventory : received}});
       Meteor.call('addMaterialAuditItem', code, 'Inventory received: '+amt+material.inventoryType);
   },
   'updateMaterialName' : function(code, name){
       check(code, String);
       check(name, String);
       var old = Materials.findOne({code : code}).name;
       //Update the material record
       Materials.update({code : code}, {$set : {name : name}});
       Meteor.call('addMaterialAuditItem', code, "Name changed from '"+old+"' to '"+name+"'");
       return true;
   },
   'addMaterialSupplier' : function(code, data){
       check(code, String);
       check(data, Object);
       var material = Materials.findOne({code : code});
       var existing = _.find(material.suppliers, function(obj){
           return obj._id == data.supplier;
       });
       if(!existing){
           var supplier = Suppliers.findOne({_id : data.supplier});
           var record = {
               _id : data.supplier,
               name : supplier.name,
               sizes : [
                   {
                       description : data.description,
                       code : data.code,
                       units : data.units,
                       minQty : data.minQty
                   }
               ]
           };
           Materials.update({code : code}, {$push : {suppliers : record}});
           Meteor.call('addMaterialAuditItem', code, 'New Supplier: '+supplier.name+' added');
       }else{
           var record = {
               description : data.description,
               code : data.code,
               units : data.units,
               minQty : data.minQty
           };
           existing.sizes.push(record);
           Materials.update({code : code, 'suppliers._id' : data.supplier}, {$push : {'suppliers.$.sizes' : record}});
           Meteor.call('addMaterialAuditItem', code, 'Supplier list updated')
       } 
   },
   'addMaterialAuditItem' : function(code, string){
       var date = new Date;
       // Record user id / name
       var obj = {
           timestamp : date,
           event : string
       };
       Materials.update({code : code}, {$push : {auditTrail : obj}});
   }
});