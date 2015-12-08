Template.product.onCreated(function(){
    var self = this;
    self.autorun(function() {
        var product = FlowRouter.getParam('code');
        self.subscribe('aProduct', product);
        self.subscribe('productInventory', product);
        self.subscribe('productFormulations', product);
        self.subscribe('Sizes');
        self.subscribe('Allergens');
        self.subscribe('HCodes');
        self.subscribe('Pictograms');
        self.subscribe('Materials');
    });
    //Session variable to select which product editor template
    //to display
    if(!Session.get('productTmpl')){
        Session.set('productTmpl', 'productInfo');
    }    
});

ReactiveTabs.createInterface({
    template: 'basicTabs',
    onChange: function (slug, template) {
        // This callback runs every time a tab changes.
        // The `template` instance is unique per {{#basicTabs}} block.
    }
});

Template.product.helpers({
    currentTemplate : function() {
        return Session.get('productTmpl');
    },
    product : function() {
        return Products.findOne();
    },
    checkFormulationError : function() {
        var formulations = Formulations.find().count();
        if(formulations == 0) {
            return true;
        }
        return false;
    },
    checkInventoryError : function() {
        var inventory = Inventory.find().count();
        if(inventory == 0) {
            return true;
        }
        return false;
    },
    allergenList : function() {
        var product = Products.findOne();
        if(!product.allergens || product.allergens.length === 0){
            return 'No Allergens';
        }
        else {
            var string = '';
            _.each(product.allergens, function(id){
                var record = Allergens.findOne({_id: id});
                string += record.name + ', ';
            });
            return string;
        }
    },
    allergenName : function(id){
        return Allergens.findOne({_id: id});
    },
    hCodeCode : function(id){
        return HCodes.findOne({_id: id});
    },
    pictogramImg : function(id){
        return Pictograms.findOne({_id: id});
    }
});

Template.product.events({
    'click button.product-nav' : function(e, tmpl){
        var template = e.target.id;
        //Set the formulation template based on productType
        if(e.target.id == 'productFormulation'){
            var type = Products.findOne().productType;
            if(type == 'Manufactured'){
                template = 'productManufacturedFormulation';
            }
            if(type == 'Resale'){
                template = 'productResaleFormulation';
            }
            if(type == 'Composite'){
                template = 'productCompositeFormulation';
            }
        }
        Session.set('productTmpl', template);
        $('button.product-nav').addClass('btn-primary');
        $(e.target).removeClass('btn-primary').addClass('btn-default');
    }
});

Template.allergens.helpers({
    allergens : function(){
        var result = Allergens.find().fetch();
        for(i=0; i<result.length; i++){
            result.index = i;
        }
        return result;
    },
    isChecked : function(id){
        var product = Products.findOne();
        return _.contains(product.allergens, id) ? "checked" : '';
    }
});

Template.allergens.events({
    'click a' : function(event){
        event.preventDefault();
        var checked = [];
        //get the values of the checked options and add to the array
        $.each($('input[name="allergens[]"]:checked'), function(){
            checked.push($(this).val());
        });
        //Replace the mongo array with the new one
        Products.update({_id: Products.findOne()._id}, {$set : {'allergens': checked}});
    }
});

Template.hcodes.helpers({
    hcodes : function(){
        return HCodes.find().fetch();
    },
    isChecked : function(id, parentContext){
        var product = Products.findOne();
        return _.contains(product.hcodes, id) ? "checked" : '';
    }
});

Template.hcodes.events({
    'click a' : function(e){
        e.preventDefault();
        var checked = [];
        //get the values of the checked options and add to the array
        $.each($('input[name="hcodes[]"]:checked'), function(){
            checked.push($(this).val());
        });
        //Replace the mongo array with the new one
        Products.update({_id: Products.findOne()._id}, {$set : {'hcodes': checked}});
    }
});

Template.pictograms.helpers({
    pictograms : function(){
        return Pictograms.find().fetch();
    },
    isChecked : function(id, parentContext){
        var product = Products.findOne();
        return _.contains(product.pictograms, id) ? "checked" : '';
    }
});

Template.pictograms.events({
    'click a' : function(e){
        e.preventDefault();
        var checked = [];
        //get the values of the checked options and add to the array
        $.each($('input[name="pictograms[]"]:checked'), function(){
            checked.push($(this).val());
        });
        //Replace the mongo array with the new one
        Products.update({_id: Products.findOne()._id}, {$set: {'pictograms': checked}});
    }
});

Template.productSizes.helpers({
    inventory : function(){
        return Inventory.find();
    }
})

Template.craftyFragrancesProduct.helpers({
    variations : function(){
        return Inventory.find();
    },
    variationAvailable : function(){
        return this.channels.craftyFragrances.available ? 'checked' : '';
    }
});

Template.craftyFragrancesProduct.events({
    'click #updateVariation' : function(e, tmpl){
        e.preventDefault();
        var data = {
            product : this.product.code,
            price : parseInt($(e.target).closest("tr").find('input[name=price]').val()*100),
            available : $(e.target).closest("tr").find('input[name=available]').is(':checked')
        };
        Inventory.update({_id : this._id}, {$set : {'channels.craftyFragrances' : data}});
    }
});