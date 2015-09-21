  Meteor.methods({
    'loadFixtures': function(){
      console.log('Loading default fixtures');

      var sizes = [
        { 
          'code' : 101,
          'description' : '100g',
          'weight' : 100
        },
        { 
          'code' : 102,
          'description' : '1Kg',
          'weight' : 1000
        },
        { 
          'code' : 103,
          'description' : '5Kg',
          'weight' : 5000
        },
        {
          'code' : 104,
          'description' : '25Kg',
          'weight' : 25000
        }
      ];
      
      _.each(sizes, function(size){
         Sizes.insert(size);     
      });
      
      var hundredgram = Sizes.findOne({'description' : '100g'});
      var onekg = Sizes.findOne({'description' : '1Kg'});
      var fivekg = Sizes.findOne({'description' : '5Kg'});
      var twentyfivekg = Sizes.findOne({'description' : '25Kg'});
      
      var products = [
        {
          'name' : 'Product One',
          'code' : 1001,
          'allergens' : [],
          'hcodes' : [],
          'pictograms' : [],
        },
        {
          'name' : 'Product Two',
          'code' : 1002,
          'allergens' : [],
          'hcodes' : [],
          'pictograms' : [],
        }
      ];
  
      _.each(products, function(product){
        Products.insert(product);
      });
      
      var productone = Products.findOne({'name' : 'Product One'});
      var producttwo = Products.findOne({'name' : 'Product Two'});
      
      var inventory = [
        {
          'sku' : productone.code+'-'+onekg.code,
          'product' : {
            '_id' : productone._id,
            'name' : productone.name,            
          },
          'size' : {
            '_id' : onekg._id,
            'description' : onekg.description
          },
          'inStock' : 0,
          'available' : 0
        },
        {
          'sku' : productone.code+'-'+fivekg.code,
          'product' : {
            '_id' : productone._id,
            'name' : productone.name,            
          },
          'size' : {
            '_id' : fivekg._id,
            'description' : fivekg.description
          },
          'inStock' : 0,
          'available' : 0
        },
        {
          'sku' : producttwo.code+'-'+fivekg.code,
          'product' : {
            '_id' : producttwo._id,
            'name' : producttwo.name,            
          },
          'size' : {
            '_id' : fivekg._id,
            'description' : fivekg.description
          },
          'inStock' : 0,
          'available' : 0
        },
        {
          'sku' : producttwo.code+'-'+hundredgram.code,
          'product' : {
            '_id' : producttwo._id,
            'name' : producttwo.name,            
          },
          'size' : {
            '_id' : hundredgram._id,
            'description' : hundredgram.description
          },
          'inStock' : 0,
          'available' : 0
        },        
      ];
      
      _.each(inventory, function(item){
        Inventory.insert(item);
      });
      
      var suppliers = [
        {
          'name' : 'Supplier One',
          'website' : 'http://www.google.com',
          'telephone' : ['123456'],
          'email' : [
            {
             'name' : 'A. Person',
             'address' : 'a.person@supplierone.com',
             'department' : 'Accounts'
            }
          ],
          'addresses' : [
            {
              'description' : 'Billing',
              'line1' : '10 A Street',
              'line2' : 'The Road',
              'town' : 'Big Town',
              'county' : 'Acounty',
              'postcode' : 'AA10 1BB',
              'country' : 'United Kingdom'
            }
          ]
        }
      ];
      
      _.each(suppliers, function(supplier){
        Suppliers.insert(supplier);
      });
      
      var supplierone = Suppliers.findOne({'name' : 'Supplier One'});
      
      var materials = [
        {
          'name' : 'Material One',
          'code' : 1001,
          'allergens' : [],
          'hcodes' : [],
          'pictograms' : [],
          'inventory' : 50,
          'suppliers' : [
            {
              '_id' : supplierone._id,
              'name' : supplierone.name,
              'code' : 'A5001',
              'sizes' : [
                {
                  '_id' : twentyfivekg._id,
                  'description' : twentyfivekg.description,
                  'price' : '60.00',
                }
              ]
            }
          ]
        },
        {
          'name' : 'Material Two',
          'code' : 1002,
          'allergens' : [],
          'hcodes' : [],
          'pictograms' : [],
          'inventory' : 100
        },
        {
          'name' : 'Material Three',
          'code' : 1003,
          'allergens' : [],
          'hcodes' : [],
          'pictograms' : [],
          'inventory' : 89.5
        }
      ];
      
      _.each(materials, function(material){
        Materials.insert(material);
      });
      
      var materialone = Materials.findOne({'name' : 'Material One'});
      var materialtwo = Materials.findOne({'name' : 'Material Two'});
      var materialthree = Materials.findOne({'name' : 'Material Three'});
      
      var formulations = [
        {
          'product' : productone._id,
          'ingredients' : [
            {
              '_id' : materialone._id,
              'name' : materialone.name,
              'qty' : 100
            },
          ]
        },
        {
          'product' : producttwo._id,
          'ingredients' : [
            {
              '_id' : materialtwo._id,
              'name' : materialtwo.name,
              'qty' : 70
            },
            {
              '_id' : materialthree._id,
              'name' : materialthree.name,
              'qty' : 30
            }
          ]
        },
      ];
      
      _.each(formulations, function(formulation){
        Formulations.insert(formulation);
      });
      
      console.log('Finished loading default fixtures');
    },

    'clearDB': function(){
      console.log('Clear DB');

      var collectionsRemoved = 0;
      var db = Meteor.users.find()._mongo.db;
      db.collections(function (err, collections) {

        var appCollections = _.reject(collections, function (col) {
          return col.collectionName.indexOf('velocity') === 0 ||
            col.collectionName === 'system.indexes'  ||
            col.collectionName.indexOf('allergens') === 0 ||
            col.collectionName.indexOf('hcodes') === 0 ||
            col.collectionName.indexOf('pictograms') === 0 ;
        });

        _.each(appCollections, function (appCollection) {
          appCollection.remove(function (e) {
            if (e) {
              console.error('Failed removing collection', e);
              fut.return('fail: ' + e);
            }
            collectionsRemoved++;
            console.log('Removed collection');
            if (appCollections.length === collectionsRemoved) {
              console.log('Finished resetting database');
            }
          });
        });

      });

      console.log('Finished clearing');
    }
  });
