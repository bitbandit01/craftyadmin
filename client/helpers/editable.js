// Template.events({
//   'click a.field-edit' : function(event){
//     event.preventDefault
//     //hide the container for the calling link
//     $(event.currentTarget.parentElement).hide();
//     //show the directly following form element
//     $(event.currentTarget.parentElement.nextElementSibling).show();
//   },
//   'click a.field-save' : function(event){
//     event.preventDefault();
//     //get the value of the input preceding the save button
//     var value = $(event.currentTarget.previousElementSibling).val();
    
//     //get the collection to update from the data-attr
//     var collectionName = $(event.currentTarget.previousElementSibling).data('collection');
//     //Find the instance of the collection with that name
//     var findCollection = function(collectionName){
//       if(window[collectionName] instanceof Meteor.Collection){
//         return (window[collectionName]);
//       }else{
//         console.log('Target is not a valid collection');
//       }
//     }
//     var collection = findCollection(collectionName);
//     //get the name of the field to update
//     var field = $(event.currentTarget.previousElementSibling).data('field');
//     //hack to dynamically set field name in mongo query
//     var query = {};
//     query[field] = value;
//     //Finally, update the relevant collection
//     collection.update({_id: this._id}, {$set : query});
    
//     //hide the container for the form
//     $(event.currentTarget.parentElement).hide();
//     //restore the directly preceding element
//     $(event.currentTarget.parentElement.previousElementSibling).show();
//   }
// });