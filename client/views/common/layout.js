Template.layout.helpers({
   username : function(){
       return Meteor.user().profile.name;    
   },
   redirectLogin : function(){
       return FlowRouter.redirect('/login');
   } 
});

Template.layout.events({
    'click #logout' : function(e){
        Meteor.logout();
    }
})