Meteor.startup(function () {
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

    console.log('Loading default fixtures');
    
    //Reset the database for casperJS Mirror only
    if(process.env.IS_MIRROR){        
        if(Sizes.find().count()){ Sizes.remove(); }
        if(Products.find().count()){ Products.remove(); }
        if(Inventory.find().count()){ Inventory.remove(); }
        if(Materials.find().count()){ Materials.remove(); }
        if(Formulations.find().count()){ Formulations.remove(); }
        if(Suppliers.find().count()){ Suppliers.remove(); }
        if(Purchases.find().count()){ Purchases.remove(); }
        if(Batches.find().count()){ Batches.remove(); }
    }
    
//     if (!Sizes.find().count()) {
//         var sizes = [
//             {
//                 'code' : 101,
//                 'description' : '100g',
//                 'weight' : 100
//             },
//             {
//                 'code' : 102,
//                 'description' : '1Kg',
//                 'weight' : 1000
//             },
//             {
//                 'code' : 103,
//                 'description' : '5Kg',
//                 'weight' : 5000
//             },
//             {
//                 'code' : 104,
//                 'description' : '25Kg',
//                 'weight' : 25000
//             }
//         ];

//         _.each(sizes, function(size){
//             Sizes.insert(size);
//         });
//     }

//     var hundredgram = Sizes.findOne({'description' : '100g'});
//     var onekg = Sizes.findOne({'description' : '1Kg'});
//     var fivekg = Sizes.findOne({'description' : '5Kg'});
//     var twentyfivekg = Sizes.findOne({'description' : '25Kg'});

//     if (!Products.find().count()) {
//         var products = [
//             {
//                 name : "Product One",
//                 code : "1001",
//                 productType : "Manufactured",
//                 allergens : [],
//                 hcodes : [],
//                 pictograms : [],
//                 channels : {
//                     craftyFragrances : {
//                         publish : false,
//                         name : "Product One",
//                         description : "Default description"
//                     }
//                 }
//             },
//             {
//                 name : "Product Two",
//                 code : "1002",
//                 productType : "Resale",
//                 allergens : [],
//                 hcodes : [],
//                 pictograms : [],
//                 channels : {
//                     craftyFragrances : {
//                         publish : false,
//                         name : "Product Two",
//                         description : "Default description"
//                     }
//                 }
//             }
//         ];

//         _.each(products, function(product){
//             Products.insert(product);
//         });

//     }

//     var productone = Products.findOne({code : '1001'});
//     var producttwo = Products.findOne({code : '1002'});


//     if (!Inventory.find().count()) {
//         var inventory = [
//             {
//                 'sku' : productone.code + '-' + onekg.code,
//                 'product' : {
//                     '_id' : productone._id,
//                     'code' : productone.code,
//                     'name' : productone.name
//                 },
//                 'size' : {
//                     '_id' : onekg._id,
//                     'description' : onekg.description
//                 },
//                 'inStock' : 0,
//                 'available' : 0,
//                 'channels' : {
//                     craftyFragrances : {
//                         product : productone.code,
//                         available : false,
//                         price : 0
//                     }
//                 }
//             },
//             {
//                 'sku' : productone.code+'-'+fivekg.code,
//                 'product' : {
//                     '_id' : productone._id,
//                     'code' : productone.code,
//                     'name' : productone.name
//                 },
//                 'size' : {
//                     '_id' : fivekg._id,
//                     'description' : fivekg.description
//                 },
//                 'inStock' : 0,
//                 'available' : 0,
//                 'channels' : {
//                     craftyFragrances : {
//                         product : productone.code,
//                         available : false,
//                         price : 0
//                     }
//                 }
//             },
//             {
//                 'sku' : producttwo.code+'-'+fivekg.code,
//                 'product' : {
//                     '_id' : producttwo._id,
//                     'code' : producttwo.code,
//                     'name' : producttwo.name
//                 },
//                 'size' : {
//                     '_id' : fivekg._id,
//                     'description' : fivekg.description
//                 },
//                 'inStock' : 0,
//                 'available' : 0,
//                 'channels' : {
//                     craftyFragrances : {
//                         product : producttwo.code,
//                         available : false,
//                         price : 0
//                     }
//                 }
//             },
//             {
//                 'sku' : producttwo.code+'-'+hundredgram.code,
//                 'product' : {
//                     '_id' : producttwo._id,
//                     'code' : producttwo.code,
//                     'name' : producttwo.name
//                 },
//                 'size' : {
//                     '_id' : hundredgram._id,
//                     'description' : hundredgram.description
//                 },
//                 'inStock' : 0,
//                 'available' : 0,
//                 'channels' : {
//                     craftyFragrances : {
//                         product : producttwo.code,
//                         available : false,
//                         price : 0
//                     }
//                 }
//             },
//         ];

//         _.each(inventory, function(item){
//             Inventory.insert(item);
//         });
//     }

//     if (!Suppliers.find().count()) {
//         var suppliers = [
//             {
//                 'name' : 'Supplier One',
//                 'website' : 'http://www.google.com',
//                 'contacts' : [
//                     {
//                         'name' : 'A. Person',
//                         'email' : 'a.person@company.com',
//                         'telephone' : ''
//                     }
//                 ],
//                 'addresses' : [
//                     {
//                         'address1' : '10 A Street',
//                         'address2' : 'The Road',
//                         'town' : 'Big Town',
//                         'county' : 'Acounty',
//                         'postcode' : 'AA10 1BB',
//                         'country' : 'United Kingdom'
//                     }
//                 ]
//             },
//             {
//                 'name' : 'Supplier Two',
//                 'website' : 'http://www.google.com',
//                 'contacts' : [
//                     {
//                         'name' : 'A. Person',
//                         'email' : '',
//                         'telephone' : '02894 465123'
//                     }
//                 ],
//                 'addresses' : [
//                     {
//                         'description' : 'Billing',
//                         'address1' : '99 A Street',
//                         'address2' : 'The Lane',
//                         'town' : 'Small Town',
//                         'county' : 'Acounty',
//                         'postcode' : 'AA10 2FF',
//                         'country' : 'United Kingdom'
//                     }
//                 ]
//             }
//         ];

//         _.each(suppliers, function(supplier){
//             Suppliers.insert(supplier);
//         });
//         var supplierone = Suppliers.findOne({'name' : 'Supplier One'});
//         var suppliertwo = Suppliers.findOne({'name' : 'Supplier Two'});
//     }

//     if (!Materials.find().count()) {
//         var materials = [
//             {
//                 'name' : 'Material One',
//                 'code' : '1001',
//                 'allergens' : [],
//                 'hcodes' : [],
//                 'pictograms' : [],
//                 'inventory' : 50000,
//                 'inventoryType' : 'Kg',
//                 'suppliers' : [
//                     {
//                         '_id' : supplierone._id,
//                         'name' : supplierone.name,
//                         'sizes' : [
//                             {
//                                 '_id' : twentyfivekg._id,
//                                 'description' : twentyfivekg.description,
//                                 'code' : '',
//                                 'units' : 1,
//                                 'minQty' : 1
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 'name' : 'Material Two',
//                 'code' : '1002',
//                 'allergens' : [],
//                 'hcodes' : [],
//                 'pictograms' : [],
//                 'inventory' : 100000,
//                 'inventoryType' : 'Kg',
//                 'suppliers' : [
//                     {
//                         '_id' : suppliertwo._id,
//                         'name' : suppliertwo.name,
//                         'code' : 'A5001',
//                         'sizes' : [
//                             {
//                                 '_id' : fivekg._id,
//                                 'description' : fivekg.description,
//                                 'code' : '',
//                                 'units' : 1,
//                                 'minQty' : 4
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 'name' : 'Material Three',
//                 'code' : '1003',
//                 'allergens' : [],
//                 'hcodes' : [],
//                 'pictograms' : [],
//                 'inventory' : 250,
//                 'inventoryType' : 'Units',
//                 'suppliers' : [
//                     {
//                         '_id' : supplierone._id,
//                         'name' : supplierone.name,
//                         'code' : 'A5001',
//                         'sizes' : [
//                             {
//                                 '_id' : twentyfivekg._id,
//                                 'description' : twentyfivekg.description,
//                                 'code' : '',
//                                 'units' : 1,
//                                 'minQty' : 5
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ];

//         _.each(materials, function(material){
//             Materials.insert(material);
//         });

//     }
    
//     var materialone = Materials.findOne({code : '1001'});
//     var materialtwo = Materials.findOne({code : '1002'});
//     var materialthree = Materials.findOne({code : '1003'});

//     if (!Formulations.find().count()) {
//         var formulations = [
//             {
//                 'product' : productone.code,
//                 'ingredients' : [
//                     {
//                         'code' : materialone.code,
//                         'name' : materialone.name,
//                         'qty' : 70000
//                     },
//                     {
//                         'code' : materialtwo.code,
//                         'name' : materialtwo.name,
//                         'qty' : 30000
//                     },
//                 ]
//             },
//             {
//                 'product' : producttwo.code,
//                 'ingredients' : [
//                     {
//                         'code' : materialthree.code,
//                         'name' : materialthree.name,
//                         'qty' : 1
//                     }
//                 ]
//             },
//         ];

//         _.each(formulations, function(formulation){
//             Formulations.insert(formulation);
//         });
//     }

    console.log('Finished loading default fixtures');
});