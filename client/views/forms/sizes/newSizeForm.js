jQuery.validator.addMethod('uniqueSizeCode', function(value, elem){
    return this.optional(elem) || !Sizes.findOne({code : value});
});

Template.newSizeForm.onRendered(function(){
    $("#newSizeForm").validate({
        rules: {
            code: {
                required: true,
                uniqueSizeCode : true
            },
            description: {
                required: true
            },
            weight : {
                required: true,
                min : 1
            }
        },
        messages : {
            code : {
                required : "Plese enter a unique code",
                uniqueSizeCode : "Product code has already been assigned"
            },
            description : "Please enter a description for this size e.g 4x5L",
            weight  : "Please enter a weight in grams"
        }
    });
});

Template.newSizeForm.events({
    'submit #newSizeForm' : function(e, tmpl){
        e.preventDefault();
        $("button[type=submit]").text("Saving...");
        var code = $("input[name=code]").val();
        var description = $("input[name=description]").val();
        var weight = $("input[name=weight]").val();
        var data = {
            code : code,
            description : description,
            weight : weight
        };
        Sizes.insert(data);
        $("button[type=submit]").text("Submit");
    }
});