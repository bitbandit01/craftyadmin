Template.craftyFragrancesProductForm.onRendered(function(){
   $("input[name='publish']").bootstrapSwitch({size: 'small'}); 
});

Template.craftyFragrancesProductForm.helpers({
    publish : function(){
        return this.channels.craftyFragrances.publish ? 'checked' : '';
    },
    name : function(){
        return this.channels.craftyFragrances.name;
    },
    description : function(){
        return this.channels.craftyFragrances.description;
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
       console.log(data);
       Products.update({_id : this._id}, {$set : {'channels.craftyFragrances' : data}}, function(err, res){
           if(err){
               console.log(err);
           }
       });
   }
});