ReactiveTabs.createInterface({
  template: 'basicTabs',
  onChange: function (slug, template) {
    // This callback runs every time a tab changes.
    // The `template` instance is unique per {{#basicTabs}} block.
  }
});

Template.material.helpers({
    allergenList : function() {
      if(this.allergens.length === 0){
        return 'No Allergens';
      }
      else {
        var string = '';
        _.each(this.allergens, function(id){
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

Template.materialAllergens.helpers({
    allergens : function(){
        var result = Allergens.find().fetch();
        for(i=0; i<result.length; i++){
          result.index = i;
        }
        return result;
    },
    isChecked : function(id, parentContext){
        return _.contains(parentContext.allergens, id) ? "checked" : '';
    }
});

Template.materialAllergens.events({
    'click a' : function(event){
        event.preventDefault();
        console.log('click');
        var checked = [];
        //get the values of the checked options and add to the array
        $.each($('input[name="allergens[]"]:checked'), function(){
          checked.push($(this).val());
        });
        //Replace the mongo array with the new one
        Materials.update({_id: Template.parentData()._id}, {$set : {'allergens': checked}});
    }
}); 

Template.materialHcodes.helpers({
    hcodes : function(){
        return HCodes.find().fetch();
    },
    isChecked : function(id, parentContext){
        return _.contains(parentContext.hcodes, id) ? "checked" : '';
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
        Materials.update({_id: Template.parentData()._id}, {$set : {'hcodes': checked}});
    }
}); 

Template.materialPictograms.helpers({
    pictograms : function(){
        return Pictograms.find().fetch();
    },
    isChecked : function(id, parentContext){
        return _.contains(parentContext.pictograms, id) ? "checked" : '';
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
        Materials.update({_id: Template.parentData()._id}, {$set: {'pictograms': checked}});
    }
}); 