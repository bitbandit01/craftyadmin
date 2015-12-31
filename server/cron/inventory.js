SyncedCron.add({
    name: 'Calculate available inventory',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 2 minutes');
    },
    job: function() {
        Meteor.call('updateInventory');
    }
});