//See server/fixtures/jasmineFixtures.js for details
Meteor.startup(function(){
   Meteor.call('clearDB', function(){
     Meteor.call('loadFixtures');
   });
});
