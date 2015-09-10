  Template.products.helpers({
    products: function () {
      return Products.find().fetch();
    }
  });

  Template.products.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });