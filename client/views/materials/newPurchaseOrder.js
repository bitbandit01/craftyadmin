Template.newPurchaseOrder.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe('Materials');
        self.subscribe('Sizes');
        self.subscribe('Inventory');
        self.subscribe('Suppliers');
        self.subscribe('Purchases');
    });
    suppliers = new ReactiveVar();
    sizes = new ReactiveVar();
});

Template.newPurchaseOrder.helpers({
   materials : function(){
       return Materials.find().fetch();
   },
   suppliers : function(){
       return suppliers.get();
   },
   sizes : function() {
       return sizes.get();
   },
   formatUnits : function(doc){
       if(doc.units > 1){
           return doc.description + ' x ' + doc.units;
       }else{
           return doc.description;
       }
   }
});

Template.newPurchaseOrder.events({
    'change #materialSelect' : function(){
        //Reset the other form selects, in case user has already drilled down
        $('#supplierSelect').val('-');
        $('#sizeSelect').val('-');
        
        var id = $('#materialSelect :selected').val();
        var material = Materials.findOne({_id: id});
        suppliers.set(material.suppliers);
    },
    'change #supplierSelect' : function(){
        var id = $('#materialSelect :selected').val();
        var supplierId = $('#supplierSelect :selected').val();
        var material = Materials.findOne({_id: id});
        var supplier = _.find(material.suppliers, function(obj){
            return obj._id == supplierId;
        });
        sizes.set(supplier.sizes);
    },
    'submit #purchaseOrderForm' : function(e){
        e.preventDefault();
        var data = {
            material : $('#materialSelect :selected').val(),
            supplier : $('#supplierSelect :selected').val(),
            size : $('#sizeSelect :selected').val(),
            qty : $('input[name=qty]').val()
        };
        Meteor.call('createPurchaseOrder', data);
    }
});