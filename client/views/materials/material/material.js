Template.material.onCreated(function(){
    var self = this;
    self.autorun(function() {
        var material = FlowRouter.getParam("code");
        self.subscribe('aMaterial', material);
        self.subscribe('Inventory');  
        self.subscribe('Sizes');
        self.subscribe('Allergens');
        self.subscribe('HCodes');
        self.subscribe('Pictograms');
        self.subscribe('Suppliers');
    });
    //Session variable to select which product editor template
    //to display
    if(!Session.get('materialTmpl')){
        Session.set('materialTmpl', 'materialInfo');
    }    
});

Template.material.helpers({
    currentTemplate : function() {
        return Session.get('materialTmpl');
    },
    material : function() {
      return Materials.findOne();
    },
    allergenName : function(id){
        return Allergens.findOne({_id: id});
    },
    hCodeCode : function(id){
        return HCodes.findOne({_id: id});
    },
    pictogramImg : function(id){
        return Pictograms.findOne({_id: id});
    },
});

Template.material.events({
    'click button.product-nav' : function(e, tmpl){
        Session.set('materialTmpl', e.target.id);
        $('button.product-nav').addClass('btn-primary');
        $(e.target).removeClass('btn-primary').addClass('btn-default');
    }
});

Template.materialAllergens.helpers({
    allergens : function(){
        var result = Allergens.find().fetch();
        for(i=0; i<result.length; i++){
          result.index = i;
        }
        return result;
    },
    isChecked : function(id){
        var material = Materials.findOne();
        return _.contains(material.allergens, id) ? "checked" : '';
    }
});

Template.materialAllergens.events({
    'click a' : function(event){
        event.preventDefault();  
        var checked = [];
        //get the values of the checked options and add to the array
        $.each($('input[name="allergens[]"]:checked'), function(){
          checked.push($(this).val());
        });
        //Replace the mongo array with the new one
        Materials.update({_id: FlowRouter.getParam("id")}, {$set : {'allergens': checked}});
    }
}); 

Template.materialHcodes.helpers({
    hcodes : function(){
        return HCodes.find().fetch();
    },
    isChecked : function(id, parentContext){
        var material = Materials.findOne();
        return _.contains(material.hcodes, id) ? "checked" : '';
    }
});

Template.materialHcodes.events({
    'click a' : function(e){
        e.preventDefault();
        var checked = [];
        //get the values of the checked options and add to the array
        $.each($('input[name="hcodes[]"]:checked'), function(){
          checked.push($(this).val());
        });
        //Replace the mongo array with the new one
        Materials.update({_id: FlowRouter.getParam("id")}, {$set : {'hcodes': checked}});
    }
}); 

Template.materialPictograms.helpers({
    pictograms : function(){
        return Pictograms.find().fetch();
    },
    isChecked : function(id, parentContext){
        var material = Materials.findOne();
        return _.contains(material.pictograms, id) ? "checked" : '';
    }
});

Template.materialPictograms.events({
    'click a' : function(e){
        e.preventDefault();
        var checked = [];
        //get the values of the checked options and add to the array
        $.each($('input[name="pictograms[]"]:checked'), function(){
          checked.push($(this).val());
        });
        //Replace the mongo array with the new one
        Materials.update({_id: FlowRouter.getParam("id")}, {$set: {'pictograms': checked}});
    }
}); 