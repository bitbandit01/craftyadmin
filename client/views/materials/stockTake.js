Template.materialStocktake.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe('Materials');
    });
});

Template.materialStocktake.helpers({
    materials: function () {
        return Materials.find().fetch();
    }
});

Template.materialStocktake.events({
  'submit .stocktake' : function(e){
    e.preventDefault();
    //build an array of elements which have values assigned, ignore empty ones
    var data = [];
    _.each($('form.stocktake input'), function(element){
        if(element.value){
            data.push({_id : element.name, value : parseInt(element.value)});
        }
    });
    Meteor.call('updateProductInventory', data, function(err, response){
       if(err){
           console.log(err.reason); 
       }
    });
  }
});