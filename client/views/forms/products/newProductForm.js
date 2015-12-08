jQuery.validator.addMethod('uniqueProductCode', function(value, elem){
    return this.optional(elem) || !Products.findOne({code : value});
});

Template.newProductForm.onRendered(function(){
    $("#newProductForm").validate({
        rules: {
            name: {
                required: true,
            },
            code: {
                required: true,
                uniqueProductCode : true
            },
            productType : {
                required: true
            }
        },
        messages : {
            name : "Please enter a product name",
            code : {
                required : "Plese enter a unique product code",
                uniqueProductCode : "Product code has already been assigned"
            },
            productType : "Please select a product type"
        }
    });
});

Template.newProductForm.helpers({
   'productTypes' : function(){
       return ['Manufactured', 'Resale', 'Composite'];
   } 
});

Template.newProductForm.events({
    'submit #newProductForm' : function(e, tmpl){
        e.preventDefault();
        $("button[type=submit]").text("Saving...");
        var name = $("input[name=name]").val();
        var code = $("input[name=code]").val();
        var type = $("select[name=productType] option").filter(":selected").val();
        var data = {
            name : name,
            code : code,
            productType : type,
            channels : {
                craftyFragrances : {
                    name : name
                }
            }
        };
        Meteor.call('createProduct', data);
        $("button[type=submit]").text("Submit");
    }
});