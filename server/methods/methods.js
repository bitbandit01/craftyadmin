Meteor.methods({
  insertInventory : function(doc) {
    var size = Sizes.findOne(doc.size._id);
    var product = Products.findOne(doc.product._id);
    var sku = product.code + '-' + size.code;
    var record = {
      sku : sku,
      product : {
        _id : product._id,
        name : product.name
      },
      size : {
        _id : size._id,
        description : size.description
      },
    };
    if(doc.gtin13){
      record.gitn13 = doc.gtin13;
    }
    //check the record to insert against the Inventory schema
    //check(record, Inventory.simpleSchema());
    
    //Insert the record
    Inventory.insert(record, function(error){

    });
  },
  insertMaterial : function(doc) {
    console.log(doc);
  },
});