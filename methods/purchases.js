if(Meteor.isServer){
    Meteor.methods({
       createPurchaseOrder : function(doc){
           //If Draft purchase order exists, append to it
           //else create a new record
           var record = Purchases.findOne({'supplier._id': doc.supplier, status : 'Draft'});
           var lineitem = {};
           var material = Materials.findOne(doc.material);
           lineitem.material = {
               '_id' : material._id,
               'name' : material.name
           };
           var supplier = _.find(material.suppliers, function(obj){
            return obj._id == doc.supplier;
           });
           var size = _.find(supplier.sizes, function(obj){
            return obj._id == doc.size;
           });
           lineitem.size = size;
           lineitem.qty = parseInt(doc.qty);
           lineitem.status = 'Pending';
           if (!record ){
               record = {
                   'supplier' : Suppliers.findOne(doc.supplier),
                   'number' : 'PO_#' + incrementCounter('counters', 'purchaseOrderNumber'),
                   'lineItems' : [lineitem]
               };
               return Purchases.insert(record);
           }else{
               Purchases.update({_id : record._id}, {$push : {lineItems : lineitem}});
               return true;
           }
       }
    });
}