Template.newBatch.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe('Products');
    self.subscribe('Formulations');
    self.subscribe('Materials');
    self.subscribe('Batches');
  });
});
