describe("Sizes Page", function() {
  
  beforeEach(function(done) {
    Router.go('/sizes');
    Tracker.afterFlush(done);
  });
  
  beforeEach(waitForRouter);
  
  it("has an Add Size form", function(){
    expect($('#addSizeForm').length).toBe(1);
  });
});