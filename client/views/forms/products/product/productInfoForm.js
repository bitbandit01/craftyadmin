Template.productInfoForm.onRendered(function(){
    $("#productInfoForm").validate({
        rules: {
            name: {
                required: true,
            },
        },
        messages : {
            name : "Please enter a product name",
        }
    });
});

Template.productInfoForm.helpers({
   name : function(){
       return Products.findOne().name;
   } 
});

Template.productInfoForm.events({
    'submit #productInfoForm' : function(e, tmpl){
        e.preventDefault();
        $("button[type=submit]").text("Saving...");
        var code = Products.findOne().code;
        var name = $("input[name=name]").val();
        Meteor.call('updateProductName', code, name);
        $("button[type=submit]").text("Submit");
    }
});