jQuery.validator.addMethod('uniqueMaterialCode', function(value, elem){
    return this.optional(elem) || !Materials.findOne({code : value});
});

Template.newMaterialForm.onRendered(function(){
    $("#newMaterialForm").validate({
        rules: {
            name: {
                required: true,
            },
            code: {
                required: true,
                uniqueMaterialCode : true
            },
        },
        messages : {
            name : "Please enter a product name",
            code : {
                required : "Plese enter a unique product code",
                uniqueMaterialCode : "Material code has already been assigned"
            }
        }
    });
});

Template.newMaterialForm.events({
    'submit #newMaterialForm' : function(e, tmpl){
        e.preventDefault();
        $("button[type=submit]").text("Saving...");
        var name = $("input[name=name]").val();
        var code = $("input[name=code]").val();
        var inventoryType = $("select[name=inventoryType] option").filter(":selected").val();
        var data = {
            name : name,
            code : code,
            inventoryType : inventoryType
        };
        Meteor.call('createMaterial', data);
        $("button[type=submit]").text("Submit");
    }
});