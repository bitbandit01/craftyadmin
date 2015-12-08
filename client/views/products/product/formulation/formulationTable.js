Template.formulationTable.helpers({
  'formatDate' : function(date){
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  },
  'formatQty' : function(){
      var material = Materials.findOne({code : this.code});
      if(material.inventoryType == 'Kg'){
          return gToKg(this.qty)+'Kg';
      }else{
          return this.qty+' Units';
      }
  }
});