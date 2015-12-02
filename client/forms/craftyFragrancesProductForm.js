Template.craftyFragrancesProductForm.helpers({
    publish : function(){
        return Template.parentData().channels.craftyFragrances.publish ? 'checked' : '';
    },
    name : function(){
        return Template.parentData().channels.craftyFragrances.name;
    },
    description : function(){
        return Template.parentData().channels.craftyFragrances.description;
    }
});

Template.craftyFragrancesProductForm.events({
   'submit #craftyFragrancesProductForm' : function(e, tmpl){
       e.preventDefault();
       var data = {
           name: e.target.name.value,
           description: e.target.description.value
       };
       if($('input[name=publish]').is(':checked')){
           data.publish = true;
       }else{
           data.publish = false;
       }
       Products.update({_id : Template.parentData()._id}, {$set : {'channels.craftyFragrances' : data}}, function(err, res){
           if(err){
               console.log(err);
           }
       });
   }
});