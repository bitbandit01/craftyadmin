Template.materialInfoForm.onRendered(function(){
    $("#materialInfoForm").validate({
        rules: {
            name: {
                required: true,
            },
        },
        messages : {
            name : "Please enter a material name",
        }
    });
});

Template.materialInfoForm.helpers({
   name : function(){
       return Materials.findOne().name;
   } 
});

Template.materialInfoForm.events({
    'submit #materialInfoForm' : function(e, tmpl){
        e.preventDefault();
        $("button[type=submit]").text("Saving...");
        var code = Materials.findOne().code;
        var name = $("input[name=name]").val();
        Meteor.call('updateMaterialName', code, name);
        $("button[type=submit]").text("Submit");
    }
});