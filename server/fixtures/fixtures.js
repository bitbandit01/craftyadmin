Meteor.startup(function () {
  //VARIABLES
  var adjectives = ['Blue', 'Black', 'Sparkling', 'Glowing', 'Radioactive', 'Red', 'White', 'Mysterious', 'Powerful'];
  var nouns = ['Slime', 'Liquid', 'Potion', 'Fluid', 'Powder', 'Dust'];
  var companies = ['Industries', 'Supplies', 'International', 'Laboratories'];
  var sizes = [
    { 
      'code' : 101,
      'description' : '100g',
      'weight' : 100
    },
    { 
      'code' : 102,
      'description' : '20g',
      'weight' : 20
    },
    { 
      'code' : 103,
      'description' : '1Kg',
      'weight' : 1000
    }
  ];
  
  //FACTORIES
  
  Factory.define('product', Products, {
    name: function() {  return Fake.color(); },
    code: function() { return _.random(1000,9999); },
    allergens : [],
    hcodes : [],
    pictograms : [],
    availableSizes : [],
  });
  
  Factory.define('supplier', Suppliers, {
    name: function() { return Fake.user({fields: ['surname']}).surname + ' ' + Fake.fromArray(companies); },
    telephone : function() { 
      var tel = [];
      _(2).times(function(){
        tel.push(_.random(2890111111, 2894999999));
      });
      return tel;
    },
    email : function() {
       var arr = [];
       var user = Fake.user();
       arr.push({
         "name" : user.fullname,
         "address" : user.email,
         "department" : "Accounts"
       });
       return arr;
    },
    addresses : function() {
      var adds = [];
      adds.push({
        "description" : "Primary",
        "line1" : Fake.word() + ' ' + Fake.fromArray(['Street', 'Park', 'Road']),
        "town" : Fake.fromArray(['London', 'Belfast', 'Leeds']),
        "county" : "Antrim",
        "postcode" : "AA10 2BC",
        "country" : "United Kingdom"
      });
      return adds;
    },    
  });
    
  Factory.define('material', Materials, {
    name: function() { return Fake.fromArray(adjectives) + ' ' + Fake.fromArray(nouns); },
    code: function() { return _.random(1000,9999); },
    allergens : [],
    hcodes : [],
    pictograms : [],
    inventory : 0,
    suppliers : [],
  });
  

  //FIXTURE GENERATION LOGIC
  
  if(!Sizes.find().count()) {
    console.log('Creating Sizes');
    for(var i=0; i<sizes.length; i++){
      Sizes.insert(sizes[i]);
    }
  }

  if (!Products.find().count()) {
    console.log('Implementing Product Factory');
    _(10).times(function(n) {
      Factory.create('product');
    });
  }
  
  if (!Suppliers.find().count()) {
    console.log('Implementing Suppliers Factory');
    _(3).times(function(n) {
      Factory.create('supplier');
    });
  }
  
  if (!Materials.find().count()) {
    console.log('Implementing Materials Factory');
    _(10).times(function(n) {
      var material = Factory.create('material');
      var id = material._id;
      
      //Add supplier information to the new material
//       var supplier = function() { 
//         //Get a random supplier
//         var random = _.sample(Supplier.find().fetch());
//         var supplier = Supplier.findOne({_id: random && random._id});
        
//         var data = {
//           "name" : supplier.name,
//           "code" : function() { return _.random(1000,9999); },
//           "sizes" : function(){
//             var arr = [];
//             var size = Fake.fromArray(sizes);
//             arr.push({
//               "_id" : size._id,
//               "_description" : size.description,
//               "price" : function() { return _.random(5.99,200.00); },
//               "priceBreaks" : []
//             });
//             return arr;
//           },
//         };
//         return data;
//       };
//       Materials.update({_id : id}, {$addToSet : {suppliers: supplier}});
    });
  }

  //Ensure that the 26 Fragrance Allergens are included
  //in the allergens collection
  if (!Allergens.find().count()) {
    console.log('Creating the Allergens Collection');
    var allergens = ['Amyl cinnamal', 'Benzyl alcohol', 'Cinnamyl alcohol', 'Citral',
                    'Eugenol', 'Hydroxy-citronellol', 'Isoeugenol', 'Amylcin-namyl alcohol',
                    'Benzyl salicylate', 'Cinnamal', 'Coumarin', 'Geraniol', 
                    'Hydroxy-methylpentylcyclohexenecarboxaldehyd', 'Anisyl alcohol',
                    'Benzyl cinnamate', 'Farnesol', '2-(4-tert-Butylbenzyl) propional-hyd',
                    'Linaool', 'Benzyl benzoate', 'Citronellol', 'Hexyl cinnam-aldehyd',
                    'd-Limonene', 'Methyl heptin carbonate', '3-Methyl-4-(2,6,6-tri-methyl-2-cyclohexen-1-yl)-3-buten-2-one',
                    'Oak moss and treemoss extract', 'Treemoss extract',
                    ];
    for(var i=0; i<allergens.length; i++){
      Allergens.insert({'name': allergens[i]});
    }
  }

  //Add all CLP hazard codes to HCodes collection
  if (!HCodes.find().count()) {
    console.log('Creating the H-codes Collection');
    var codes = [
    {'code' : 'H200', 'description' : 'Unstable explosives'},
    {'code' : 'H201', 'description' : 'Explosive; mass explosion hazard'},
    {'code' : 'H202', 'description' : 'Explosive, severe projection hazard'},
    {'code' : 'H203', 'description' : 'Explosive; fire, blast or projection hazard'},
    {'code' : 'H204', 'description' : 'Fire or projection hazard'},
    {'code' : 'H205', 'description' : 'May mass explode in fire'},
    {'code' : 'H220', 'description' : 'Extremely flammable gas'},
    {'code' : 'H221', 'description' : 'Flammable gas'},
    {'code' : 'H222', 'description' : 'Extremely flammable aerosol'},
    {'code' : 'H223', 'description' : 'Flammable aerosol'},
    {'code' : 'H224', 'description' : 'Extremely flammable liquid and vapour'},
    {'code' : 'H225', 'description' : 'Highly flammable liquid and vapour'},
    {'code' : 'H226', 'description' : 'Flammable liquid and vapour'},
    {'code' : 'H228', 'description' : 'Flammable solid'},
    {'code' : 'H240', 'description' : 'Heating may cause an explosion'},
    {'code' : 'H241', 'description' : 'Heating may cause a fire or explosion'},
    {'code' : 'H242', 'description' : 'Heating may cause a fire'},
    {'code' : 'H250', 'description' : 'Catches fire spontaneously if exposed to air'},
    {'code' : 'H251', 'description' : 'Self-heating: may catch fire'},
    {'code' : 'H252', 'description' : 'Self-heating in large quantities; may catch fire'},
    {'code' : 'H260', 'description' : 'In contact with water releases flammable gases which may ignite spontaneously'},
    {'code' : 'H261', 'description' : 'In contact with water releases flammable gases'},
    {'code' : 'H270', 'description' : 'May cause or intensify fire; oxidiser'},
    {'code' : 'H271', 'description' : 'May cause fire or explosion; strong oxidiser'},
    {'code' : 'H272', 'description' : 'May intensify fire; oxidiser'},
    {'code' : 'H280', 'description' : 'Contains gas under pressure; may explode if heated'},
    {'code' : 'H281', 'description' : 'Contains refrigerated gas; may cause cryogenic burns or injury'},
    {'code' : 'H290', 'description' : 'May be corrosive to metals'},
    {'code' : 'H300', 'description' : 'Fatal if swallowed'},
    {'code' : 'H301', 'description' : 'Toxic if swallowed'},
    {'code' : 'H302', 'description' : 'Harmful if swallowed'},
    {'code' : 'H304', 'description' : 'May be fatal if swallowed and enters airways'},
    {'code' : 'H310', 'description' : 'May be fatal if swallowed and enters airways'},
    {'code' : 'H311', 'description' : 'Toxic in contact with skin'},
    {'code' : 'H312', 'description' : 'Harmful in contact with skin'},
    {'code' : 'H314', 'description' : 'Causes severe skin burns and eye damage'},
    {'code' : 'H315', 'description' : 'Causes skin irritation'},
    {'code' : 'H317', 'description' : 'May cause an allergic skin reaction'},
    {'code' : 'H318', 'description' : 'Causes serious eye damage'},
    {'code' : 'H319', 'description' : 'Causes serious eye damage'},
    {'code' : 'H330', 'description' : 'Fatal if inhaled'},
    {'code' : 'H331', 'description' : 'Toxic if inhaled'},
    {'code' : 'H332', 'description' : 'Harmful if inhaled'},
    {'code' : 'H334', 'description' : 'May cause allergy or asthma symptoms or breathing difficulties if inhaled'},
    {'code' : 'H335', 'description' : 'May cause respiratory irritation'},
    {'code' : 'H336', 'description' : 'May cause drowsiness or dizziness'},
    {'code' : 'H340', 'description' : 'May cause genetic defects'},
    {'code' : 'H341', 'description' : 'Suspected of causing genetic defects'},
    {'code' : 'H350', 'description' : 'May cause cancer'},
    {'code' : 'H351', 'description' : 'Suspected of causing cancer'},
    {'code' : 'H360', 'description' : 'May damage fertility or the unborn child'},
    {'code' : 'H361', 'description' : 'Suspected of damaging fertility or the unborn child'},
    {'code' : 'H362', 'description' : 'May cause harm to breast-fed children'},
    {'code' : 'H370', 'description' : 'Causes damage to organs'},
    {'code' : 'H371', 'description' : 'May cause damage to organs'},
    {'code' : 'H372', 'description' : 'Causes damage to organs through prolonged or repeated exposure'},
    {'code' : 'H373', 'description' : 'May cause damage to organs through prolonged or repeated exposure'},
    {'code' : 'H400', 'description' : 'Very toxic to aquatic life'},
    {'code' : 'H401', 'description' : 'Very toxic to aquatic life with long lasting effects'},
    {'code' : 'H411', 'description' : 'Toxic to aquatic life with long lasting effects'},
    {'code' : 'H412', 'description' : 'Harmful to aquatic life with long lasting effects'},
    {'code' : 'H413', 'description' : 'May cause long lasting harmful effects to aquatic life'},
    ];
    for(var i=0; i<codes.length; i++){
      HCodes.insert(codes[i]);
    }
  }

  //Add all CLP pictograms to Pictograms collection
  if(!Pictograms.find().count()){
    console.log('Creating the Pictograms collection');
    var pictograms = [
    {'name' : 'Warning', 'src' : '/img/warning.gif'},
    {'name' : 'Flammable', 'src': '/img/flammable.gif'},
    {'name' : 'Oxidiser', 'src' : '/img/oxidiser.gif'},
    {'name' : 'Corrosive', 'src': '/img/corrosive.gif'},
    {'name' : 'Environmental Hazard', 'src' : '/img/environment.gif'},
    {'name' : 'Gas Under Pressure', 'src' : '/img/gas.gif'},
    {'name' : 'Explosive', 'src' : '/img/explosive.gif'},
    {'name' : 'Toxic', 'src' : '/img/toxic.gif'},
    {'name' : 'Carcinogenic', 'src' : '/img/carcinogen.gif'},
    ];
    for(var i=0; i<pictograms.length; i++){
        Pictograms.insert(pictograms[i]);
    }
  }
});