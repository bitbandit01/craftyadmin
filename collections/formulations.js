Formulations = new Meteor.Collection('formulations');

formulationSchema = new SimpleSchema({
  product : {
    type : String,
    regEx : SimpleSchema.RegEx.Id,
  },
  date : {
    type : Date,
    autoform : {
      omit : true
    },
    optional : true,
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
  ingredients : {
    type : [Object],
  },
  'ingredients.$._id' : {
    type : String,
    regEx : SimpleSchema.RegEx.Id,
    autoform : {
      afFieldInput : {
        options : function(){
          var options = [];
          Materials.find().fetch().forEach(function(record){
            options.push({
              label : record.name, value : record._id
            })
          });
          return options;
        }
      }
    }
  },
  'ingredients.$.name' : {
    type : String,
    autoform : {
      omit : true
    },
    autoValue : function(){
      var id = this.siblingField('_id').value;
      var record = Materials.findOne(id);
      return record.name;
    },
  },
  'ingredients.$.qty' : {
    type : Number,
    decimal : true
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