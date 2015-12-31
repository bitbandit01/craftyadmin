casper.test.begin("Tests", function(test){
  
   casper.start("http://localhost:5000", function(){
       casper.waitForSelector("body", function(){
           test.assertExists('h1#branding');
           test.assertSelectorHasText('h1#branding', 'Crafty Dashboard');
       });
   });
       
   casper.run(function(){
       test.done();
   });
});
