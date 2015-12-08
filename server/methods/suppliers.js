Meteor.methods({
    'addNewSupplier' : function(obj){
        check(obj, Object);
        Suppliers.insert(obj);
    }
})