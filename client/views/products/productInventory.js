Template.productInventory.helpers({
  inventory : function() {
    return Inventory.find({"product._id" : this._id}).fetch();
  }
});

Template.addProductInventory.helpers({
  sizeOptions : function() {
    var options = [];
    Sizes.find().fetch().forEach(function(record){
      options.push({
        label : record.description, value : record._id
      })
    });
    return options;
  },
  sizeDescription : function() {
    var id = AutoForm.getFieldValue("size._id");
    var record = Sizes.findOne(id);
    if (record) {
      return record.description;
    }
  }
});