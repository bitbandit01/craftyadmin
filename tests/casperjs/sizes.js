casper.test.begin("Sizes", function(test){
  
   casper.start("http://localhost:5000/sizes", function(){
       casper.waitForSelector("body", function(){
           casper.capture('screenshot.png');
           test.assertExists('form[name=newSizeForm]');
       });
   });
    
   casper.then(function(){
       test.assertElementCount('tbody > tr', 0);    
   });
    
   casper.then(function(){
       casper.fill('form[name=newSizeForm]', {
           'code' : '101',
           'description' : 'Unit',
           'weight' : '1'
       }, true);
   });
    
   casper.then(function(){
       test.assertElementCount('tbody > tr', 1);
   });
       
   casper.run(function(){
       test.done();
   });
});
