Template.inventory.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe('Inventory');
    });
});

Template.inventory.helpers({
    inventory: function () {
        return Inventory.find().fetch();
    }
});