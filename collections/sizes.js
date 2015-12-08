Sizes = new Meteor.Collection('sizes');

Sizes.attachSchema(new SimpleSchema({
  code : {
    type: String,
    unique : true
  },
  description : {
    type : String,
    unique : true    
  },
  weight : {
    type : Number,
    min : 0
  }
}));

Sizes.allow({
  insert : function(){
    return true;
  },
  update : function(){
    return true;
  }
});