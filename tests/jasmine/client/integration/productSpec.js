describe("Products Page", function(){
  var form;
  
  beforeEach(function(done) {
    Router.go('/products');
    Tracker.afterFlush(done);
  });
  
  beforeEach(waitForRouter);
  
  beforeEach(function(){
    this.form = $('#addProductForm');
  });
  
  it("has an Add Product form", function(){
    expect(this.form.length).toBe(1);
  });
  
  describe("Add Product form", function(){
    xit("throws an error if empty", function() {
      submitCallback = jasmine.createSpy().and.returnValue(false);
      this.form.submit(submitCallback);
      
      expect(submitCallback).toHaveBeenCalled();
      expect(submitCallback).toThrow();
    });
  });
});