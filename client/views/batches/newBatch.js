Template.newBatch.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe('Products');
    self.subscribe('Formulations');
    self.subscribe('Materials');
    self.subscribe('Batches');
  });
  Session.set('currProduct', '');
  Session.set('batchSize', 100);
  available = new ReactiveVar();
});

AutoForm.addHooks(["newBatchForm"], {
  onSuccess : function(formType, result) {
    var params = {
      id : result
    };
    return FlowRouter.go('batch', params);
  }
});

Template.newBatch.helpers({
  products : function(){
    var options = [];
    var products = Products.find().fetch();
    _.each(products, function(item){
      options.push({value: item._id, label : item.name});
    });
    return options;
  },
  available : function(){
    product = Session.get('currProduct');
    if(product && product != ''){
       Meteor.call('formulationMaxAvailable', product, function(error, data){
         if(!error){
           available.set(data);
         }else{
           console.log(error);
           available.set(0);
         }
       });
    }else{
      available.set(0);
    }
    return available.get();
  }
});

Template.newBatch.events({
  'change #product-select' : function(e){
    var product = $('select[name=product] option:selected').val();
    Session.set('currProduct', product);
  },
  'blur #batchSize' : function(e){
    var value = $('#batchSize').val()
    if(value > 0){
      Session.set('batchSize', value);
    }else{
      Session.set('batchSize', 100);
    }
  }
});

Template.batchFormulation.helpers({
  formulationFor : function(){
    return Session.get('batchSize');
  },
  formulationAdjusted : function(){
    var size = Session.get('batchSize');
    product = Session.get('currProduct');
    if(product && product != ''){
       var formulation = Formulations.findOne({product: product});
      //multiply ingredient percentage * required batch size
       _.each(formulation.ingredients, function(ingredient){
         ingredient.qty = ingredient.qty/100*size;
       });
      return formulation;
    }
  }
});
