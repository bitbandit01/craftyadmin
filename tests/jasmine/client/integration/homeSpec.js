describe("Homepage", function(){
  beforeEach(function(done) {
    FlowRouter.go('/');
    done();
  });
  
  it("shows the 'Crafty' heading", function(){
    expect($('#branding a').text()).toEqual('Crafty');
  });
  
  it("shows navigation pills", function(){
    expect($('ul.nav').length).toBe(1);
  });
});
