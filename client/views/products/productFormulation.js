Template.productFormulation.helpers({
  'currentFormulation' : function(id) {
    //Returns an array with one element
    var data = Formulations.find({product : id}, {sort : {date : -1}, limit : 1}).fetch();
    return data[0];
  },
  'previousFormulations' : function(id) {
    //Returns an array with one element
    var data = Formulations.find({product : id}, {sort : {date : -1}}).fetch();
    return data;
  },
  'formatDate' : function(date){
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }
});