Template.product.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe('Products');
    self.subscribe('Sizes');
    self.subscribe('Allergens');
    self.subscribe('HCodes');
    self.subscribe('Pictograms');
    self.subscribe('Inventory');
    self.subscribe('Formulations');
    self.subscribe('Materials');
  });
});

ReactiveTabs.createInterface({
  template: 'basicTabs',
  onChange: function (slug, template) {
    // This callback runs every time a tab changes.
    // The `template` instance is unique per {{#basicTabs}} block.
  }
});

Template.product.helpers({
    product : function() {
      var id = FlowRouter.getParam("id");
      return Products.findOne(id);
    },
    allergenList : function() {
      var product = Products.findOne(FlowRouter.getParam("id"));
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
    },
    tabs: function () {
      // Every tab object MUST have a name and a slug!
      return [
        { name: 'Basic Information', slug: 'basicInfo'},
        { name: 'Allergens', slug: 'allergens' },
        { name: 'H-Codes', slug: 'hcodes' },
        { name: 'P-Codes', slug: 'pcodes' },
        { name: 'Pictograms', slug: 'pictograms' },
      ];
    },
    activeTab: function () {
      // Use this optional helper to reactively set the active tab.
      // All you have to do is return the slug of the tab.

      // You can set this using an Iron Router param if you want--
      // or a Session variable, or any reactive value from anywhere.

      // If you don't provide an active tab, the first one is selected by default.
      // See the `advanced use` section below to learn about dynamic tabs.
      return Session.get('activeTab'); // Returns "people", "places", or "things".
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
        var product = Products.findOne(FlowRouter.getParam("id"));
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
        Products.update({_id: FlowRouter.getParam("id")}, {$set : {'allergens': checked}});
    }
}); 

Template.hcodes.helpers({
    hcodes : function(){
        return HCodes.find().fetch();
    },
    isChecked : function(id, parentContext){
        var product = Products.findOne(FlowRouter.getParam("id"));
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
        Products.update({_id: FlowRouter.getParam("id")}, {$set : {'hcodes': checked}});
    }
}); 

Template.pictograms.helpers({
    pictograms : function(){
        return Pictograms.find().fetch();
    },
    isChecked : function(id, parentContext){
        var product = Products.findOne(FlowRouter.getParam("id"));
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
        Products.update({_id: FlowRouter.getParam("id")}, {$set: {'pictograms': checked}});
    }
}); 