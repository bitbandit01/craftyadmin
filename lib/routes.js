Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
});

Router.route('/', {
    name: 'home',
    waitOn: function() {
      Meteor.subscribe('Products');
    },
    action: function() {
      this.render('products');
    }
});

Router.route('/products/', {
    name: 'products',
    waitOn: function() {
      Meteor.subscribe('Products');
    },
    action: function() {
      this.render('products');
    }
});

Router.route('/product/:_id', {
    name: 'aProduct',
    waitOn: function() {
      Meteor.subscribe('Products');
      Meteor.subscribe('Allergens');
      Meteor.subscribe('HCodes');
      Meteor.subscribe('Pictograms');
      Meteor.subscribe('Inventory');
      Meteor.subscribe('Sizes');
      Meteor.subscribe('Materials');
      Meteor.subscribe('Formulations');
    },
    data: function() {
      return Products.findOne({_id : this.params._id});
    },
    action: function() {
      return this.render('product'); 
    }
});  

// Router.route('/label/:_id', function() {
//   var currentProduct = Products.findOne({_id : this.params._id});
//   var data = {
//     "name" : "magical potion"
//   };
//   var templatePath = process.env.PWD + "/public/label.pdf";
//   var outputPath = process.env.PWD + "/public/labelTemp.pdf";  
//   var pdfFiller = Meteor.npmRequire('node-pdffiller');
//   pdfFiller.fillForm( templatePath, outputPath, data, function(err) { 
//       if (err) throw err;
//       console.log("In callback (we're done)."); 
//   });
//   //Output the generated temp file to the browser
//   var fs = Meteor.npmRequire('fs');
//   var data = fs.readFileSync(outputPath);
//   this.response.write(data);
//   this.response.end();
//   this.render('/public/temp.pdf');
// }, {
//   where : 'server'
// });

// Router.route('/pdf', function() {
//     var filePath = process.env.PWD + "/public/label.pdf";
//     var fs = Meteor.npmRequire('fs');
//     var data = fs.readFileSync(filePath);
//     this.response.write(data);
//     this.response.end();
// }, {
//     where: 'server'
// });

Router.route('/sizes', {
  name : 'sizes',
  waitOn : function() {
    Meteor.subscribe('Sizes');
  },
  action : function() {
    return this.render('sizes');
  }
});

Router.route('/inventory', {
  name : 'inventory',
  waitOn : function() {
    Meteor.subscribe('Inventory');
  },
  action : function() {
    return this.render('inventory');
  }
});

Router.route('/materials', {
  name : 'materials',
  waitOn : function() {
    Meteor.subscribe('Materials');
    Meteor.subscribe('Suppliers');
    Meteor.subscribe('Sizes');
  },
  data : function() {
    return Materials.find();
  },
  action : function() {
    return this.render('materials');
  }
});

Router.route('/material/:_id', {
  name : 'aMaterial',
  waitOn : function() {
    Meteor.subscribe('Materials');
    Meteor.subscribe('Suppliers');
    Meteor.subscribe('Sizes');
    Meteor.subscribe('Allergens');
    Meteor.subscribe('HCodes');
    Meteor.subscribe('Pictograms');
  },
  data : function() {
    return Materials.findOne({_id : this.params._id});
  },
  action : function() {
    return this.render('material');
  }
});

Router.route('/formula', {
  name : 'formulation',
  waitOn : function() {
    Meteor.subscribe('Formulations');
    Meteor.subscribe('Materials');
    Meteor.subscribe('Suppliers');
    Meteor.subscribe('Sizes');
  },
  action : function() {
    return this.render('addFormulation');
  }
});

Router.route('/suppliers', {
    name: 'suppliers',
    waitOn: function() {
      Meteor.subscribe('Suppliers');
      Meteor.subscribe('Products');
    },
    data: function() {
      return Suppliers.find().fetch();
    },
    action : function() {
      return this.render('suppliers');
    }
});

Router.route('/supplier/:_id', {
  name : 'aSupplier',
  waitOn : function() {
    Meteor.subscribe('Suppliers');
  },
  data : function() {
    return Suppliers.findOne({_id : this.params._id});
  },
  action : function() {
    return this.render('supplier');
  }
});

//Router.plugin('dataNotFound', { notFoundTemplate: '404'});
Router.onBeforeAction('dataNotFound', {only: ['aProduct', 'aMaterial']});
Router.onBeforeAction('loading');