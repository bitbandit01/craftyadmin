Sizes = new Meteor.Collection('sizes');

Sizes.attachSchema(new SimpleSchema({
  code : {
    type: Number,
    unique : true
  },
  description : {
    type : String,
    label : "Description",
    unique : true    
  },
  weight : {
    type : Number,
    label : "Weight",
    min : 0
  }
}));