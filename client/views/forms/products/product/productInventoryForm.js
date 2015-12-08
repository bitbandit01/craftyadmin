Template.productInventoryForm.onRendered(function(){
    $("#productInventoryForm").validate({
        rules: {
            id : {
                required: true,  
            },
            gtin13: {
                required: false,
            },
        },
        messages : {
            name : "Please enter a valid GTIN-13 barcode",
        }
    });
});

Template.productInventoryForm.helpers({
   sizeOptions : function(){
        var options = [];
        Sizes.find().fetch().forEach(function(record){
          //Filter out the sizes which have already been assigned
          var exists = Inventory.findOne({'size.description' : record.description});
          if(!exists){
              options.push({
                label : record.description, value : record._id
              });
          }
        });
        return options;
   } 
});

Template.productInventoryForm.events({
    'submit #productInventoryForm' : function(e, tmpl){
        e.preventDefault();
        $("button[type=submit]").text("Saving...");
        var size = $("select[name=id] option").filter(":selected").val();
        var gtin13 = $("input[name=gtin13]").val();
        var data = {
            size : size,
            gtin13 : gtin13
        };
        var code = Products.findOne().code;
        Meteor.call('addProductSize', code, data);
        $("button[type=submit]").text("Submit");
    }
});