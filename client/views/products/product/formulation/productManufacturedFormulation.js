Template.productManufacturedFormulation.helpers({
  'currentFormulation' : function() {
    var product = FlowRouter.getParam("code");
    //Returns an array with one element
    var data = Formulations.find({product : product}, {sort : {date : -1}, limit : 1}).fetch();
    return data[0];
  },
  'previousFormulations' : function() {
    var product = FlowRouter.getParam("code");
    //Returns an array with one element
    var data = Formulations.find({product : product}, {sort : {date : -1}}).fetch();
    return data;
  }
});