describe("Homepage", function(){
  beforeEach(function(done) {
    Router.go('/');
    Tracker.afterFlush(done);
  });
  
  beforeEach(waitForRouter);
  
  it("shows the 'Crafty' heading", function(){
    expect($('#branding a').text()).toEqual('Crafty');
  });
  
  it("shows navigation pills", function(){
    expect($('ul.nav').length).toBe(1);
  });
});
