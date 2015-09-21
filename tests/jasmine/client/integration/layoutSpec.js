describe("Sizes Page", function() {
  
  beforeEach(function(done) {
    FlowRouter.go('/sizes');
    done();
  });
  
  it("has an Add Size form", function(){
    expect($('#addSizeForm').length).toBe(1);
  });
});