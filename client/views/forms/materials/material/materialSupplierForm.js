Template.materialSupplierForm.onRendered(function(){
    $("#materialSupplierForm").validate({
        rules: {
            supplier : {
                required: true,    
            },
            description: {
                required : true,
            },
            code: {
                required: false
            },
            units : {
                required: true,
                min : 1
            },
            minQty : {
                required: true,
                min : 1
            },
        },
    });
});

Template.materialSupplierForm.helpers({
   suppliers : function(){
        var options = [];
        Suppliers.find().fetch().forEach(function(record){
            options.push({
                label : record.name, value : record._id
            });
        });
        return options;
   },
});

Template.materialSupplierForm.events({
    'submit #materialSupplierForm' : function(e, tmpl){
        e.preventDefault();
        $("button[type=submit]").text("Saving...");
        var supplier = $("select[name=supplier] option").filter(":selected").val();
        var description = $("input[name=description]").val();
        var code = $("input[name=code]").val();
        var units = $("input[name=units]").val();
        var minQty = $("input[name=minQty]").val();
        var data = {
            supplier : supplier,
            description : description,
            code : code,
            units : units,
            minQty : minQty
        };
        var code = Materials.findOne().code;
        Meteor.call('addMaterialSupplier', code, data);
        $("button[type=submit]").text("Save");
    }
});