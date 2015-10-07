Template.purchaseOrder.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe('Materials');
        self.subscribe('Sizes');
        self.subscribe('Inventory');
        self.subscribe('Suppliers');
        self.subscribe('Purchases');
    });
});

Template.purchaseOrder.helpers({
   purchase : function(){
       var id = FlowRouter.getParam('id');
       return Purchases.findOne(id);
   },
});

Template.purchaseOrder.events({
    'click #deleteLineItem' : function(e){
        e.preventDefault();
        Modal.show('confirmDelete', this);
    }
})

Template.confirmDelete.events({
   'click #confirm' : function(e){
       e.preventDefault();
       console.log(this);
   } 
});