Formulations = new Meteor.Collection('formulations');

formulationSchema = new SimpleSchema({
  product : {
    type : String
  },
  date : {
    type : Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  instructions : {
      type : String,
      optional : true
  },
  ingredients : {
    type : [Object],
  },
  'ingredients.$.code' : {
    type : String,
  },
  'ingredients.$.name' : {
    type : String,
  },
  'ingredients.$.qty' : {
    type : Number
  }
});

Formulations.attachSchema(formulationSchema);

Formulations.allow({
  insert : function(){
    return true;
  },
  update : function(){
    return true;
  }
});