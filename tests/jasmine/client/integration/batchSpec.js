describe("New Batch page", function(){
  
  beforeEach(function(done) {
    FlowRouter.go('/batch');
    //wait a couple of secs for subs
    setTimeout(function(){
      done();
    }, 2000);
  });

  it("should allow you to select a product", function(){
    expect($('select[name=product] option')[1].text).toBe('Product One');
  });
  
  it("should show the amount available for selected product", function(){
    //Set Product One to be selected
    $('select[name=product] option:selected').removeAttr('selected');
    $('select[name=product] option').first().next().attr('selected','selected');
    expect($('select[name=product] option:selected').text()).toBe('Product One');

    //Should be 50 Available for Product One
    expect($('h2').first().text()).toBe('Available: 50');

  });
});