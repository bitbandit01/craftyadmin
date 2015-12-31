Template.login.events({
   'click #loginWithGoogle' : function(e, tmpl){
       Meteor.loginWithGoogle({}, function(error){
           if(error){
               $('#loginError').text(error.reason);
           }else{
               FlowRouter.redirect('/');
           }
       });
   } 
});