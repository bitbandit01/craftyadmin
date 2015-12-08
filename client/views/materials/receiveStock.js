Template.receiveStock.onCreated(function(){
   var self = this;
   self.autorun(function(){
      self.subscribe('Materials'); 
   });
});