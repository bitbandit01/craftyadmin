SyncedCron.add({
    name: 'Calculate available inventory',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 2 minutes');
    },
    job: function() {
        var inventory = Inventory.find().fetch();
        _.each(inventory, function(item){
            //Async method call we need to wait for result of
            var callSync= Meteor.wrapAsync(Meteor.call);
            var max = callSync('formulationMaxAvailable', item.product._id);
            var size = Sizes.findOne({_id : item.size._id});
            var weight = size.weight;
            var available = Math.floor(max/weight);
            //Perform the update if the value has changed
            if(item.available != available){
                Inventory.update({_id : item._id}, {$set : {available : available}});    
            }
        });
    }
});