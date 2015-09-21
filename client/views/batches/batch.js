Template.batch.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe('Products');
        self.subscribe('Formulations');
        self.subscribe('Materials');
        self.subscribe('Batches');
        self.subscribe('Inventory');
    });
});

Template.batch.helpers({
    batch : function(){
        return Batches.findOne(FlowRouter.getParam("id"));
    },
    productName : function(id){
        var product = Products.findOne(id);
        return product.name;
    },
    productSizes : function(id){
        var sizes = Inventory.find({'product._id' : id}).fetch();
        var options = [];
        _.each(sizes, function(size){
           options.push({value: size._id, label : size.size.description});
        });
        return options;
    },
    statusOptions : function(){
        return [
            {label:'Incomplete', value : 'Incomplete'},
            {label:'Complete', value:'Complete'}
        ];
    }
});

Template.batch.events({
   'submit #assignStockForm' : function(e){
       e.preventDefault();
       var data = {
           'batch' : FlowRouter.getParam("id"),
           'size' : $('select[name=size]').val(),
           'qty' : $('input[name=qty]').val()
       };
       Meteor.call('assignStock', data, function(err, result){
            if(err) {
                console.log(err);
            }else{
                console.log(result);
            }
       });
   }
});