Batches = new Meteor.Collection('batches');

Schema.BatchSchema = new SimpleSchema({
    product : {
        type : String
    },
    batchNo : {
        type : String,
        unique: true,
        optional: true
    },
    startTime : {
        type : Date,
        optional: true
    },
    status : {
        type : String,
        allowedValues : ['Incomplete', 'Complete'],
        optional: true
    },
    batchSize : {
        type : Number,
        min : 0,
        //custom validation against available inventory
        custom : function(){
            var product = this.field('product').value;
            var formulation = Formulations.findOne({product: product});
            var available = [];
            //Calculate whats available for each particular ingredient
            _.each(formulation.ingredients, function(ingredient){
                var material = Materials.findOne(ingredient._id);
                //grams for 1Kg
                var requirement = (ingredient.qty/100);
                //round down
                available.push(Math.floor(material.inventory/requirement));
            });
            console.log(available);
            //The actual available will be the lowest of the values
            var max = Math.min.apply(null, available);
            if(max < this.value){
                return 'notEnoughStock';
            }
        }
    },
    formulation : {
        type : String,
        optional : true
    },
    ingredients : {
        type : [Object],
        optional : true
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
    },
    'ingredients.$.batchNo' : {
        type : [String],
        optional : true,
        defaultValue : []
    },
    inventory : {
        type : [Object],
        optional : true
    },
    'inventory.$._id' : {
        type : String
    },
    'inventory.$.sku' : {
        type : String,
    },
    'inventory.$.description' : {
        type : String,
    },
    'inventory.$.qty' : {
        type : Number
    },
    remaining : {
        type : Number,
        optional : true
    },
    qcNotes : {
        type : [Object],
        optional : true
    },
    'qcNotes.$.text' : {
        type : String,
        autoform : {
            label: 'Note'
        }
    },
    'qcNotes.$.timestamp' : {
        type : Date,
        autoValue : function(){
            return new Date();
        },
        autoform : {
            omit : true
        }
    },
});

Batches.attachSchema(Schema.BatchSchema);

Batches.simpleSchema().messages({
    "notEnoughStock" : "Not enough stock available to make [value]"
});

Batches.allow({
    insert : function(){
        return true;
    },
    update : function(){
        return true;
    }
});