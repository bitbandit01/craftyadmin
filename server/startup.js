Meteor.startup(function(){
    var api = new craftyAPI();
    //Sync all products with Crafty Cart
//     _.each(Products.find().fetch(), function(product){
//         api.updateProduct(product);
//     });
    //Sync all inventory with Crafty Cart
//     _.each(Inventory.find().fetch(), function(item){
//         api.updateVariant(item);
//     });
});