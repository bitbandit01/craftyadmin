Template.newSupplierForm.onRendered(function(){
    $("#newSupplierForm").validate({
        rules: {
            name: {
                required: true,
            },
            website: {
                required: false
            },
            contactName : {
                required: {
                    depends : function(element){
                        return $("input[name=email]").val().length > 1 ||
                               $("input[name=telephone]").val().length  > 1
                    }
                }
            },
            email : {
                required: false,
            },
            telephone : {
                required: false,
            }
        }
    });
});

Template.newSupplierForm.helpers({
   countries : function() {
       return [
           { label : "United Kingdom", value : "United Kingdom"},
           { label : "Ireland", value : "Ireland"}
       ];
   } 
});

Template.newSupplierForm.events({
    'submit #newSupplierForm' : function(e, tmpl){
        e.preventDefault();
         $("button[type=submit]").text("Saving...");
        var name = $("input[name=name]").val();
        var website = $("input[name=website]").val();
        var contactName = $("input[name=contactName]").val();
        var email = $("input[name=email]").val();
        var telephone = $("input[name=telephone]").val();
        var address1 = $("input[name=address1]").val();
        var address2 = $("input[name=address2]").val();
        var address3 = $("input[name=address3]").val();
        var town = $("input[name=town]").val();
        var county = $("input[name=county]").val();
        var postcode = $("input[name=postcode]").val();
        var country = $("select[name=country] option").filter(":selected").val();
        var data = {
            name : name,
            website : website,
            contacts : [
                {
                    name : contactName,
                    email : email,
                    telephone : telephone
                }
            ],
            addresses : [
                {
                    address1 : address1,
                    address2 : address2,
                    address3 : address3,
                    town : town,
                    county : county,
                    postcode : postcode,
                    country : country
                }
            ]
        };
        console.log(data);
        Meteor.call('addNewSupplier', data);
        $("button[type=submit]").text("Submit");
    }
});