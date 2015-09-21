describe("Products Page", function(){
  
  beforeEach(function(done) {
    FlowRouter.go('/products');
    //wait a couple of secs for subs
    setTimeout(function(){
      done();
    }, 2000);
  });

  it("has an Add Product form", function(){
    expect($('#addProductForm').length).toBe(1);
  });
  
  it("displays a list of products in a table", function(){
     expect($('table.products-table').length).toBe(1);
     expect($('table.products-table td').first().text()).toBe('Product One');
  });
  
  it("adds a row to the table when a new product is added via form", function(){
    var expectedRows = ($('table.products-table tr').length + 1);
    //Manually add a product via the form
    $('#addProductForm input[name=name]').val('Test Product');
    $('#addProductForm input[name=code]').val('12345');
    $('form#addProductForm').submit();
    //Give it time for changes to propogate
    setTimeout(function(){
      expect($('table.products-table tr').length).toBe(expectedRows);
    }, 1000);    
  });

});

describe("Product Page", function(){
  
  beforeEach(function(done) {
    FlowRouter.go('/products');
    done();
  });
  
  xit("displays the product name", function(){
    return false;
  });
  
  xit("allows the product name to be changed", function(){
    return false;
  });
  
  xit("updates allergens using a form", function(){
    return false;
  });
  
  xit("updates H-codes using a form", function(){
    return false;
  });
  
  xit("updates P-codes using a form", function(){
    return false;
  });
  
  xit("updates Pictograms using a form", function(){
    return false;
  });
  
  xit("allows a size to be added using a form", function(){
    return false;
  });
  
  xit("throws an error if adding a size that already exists", function(){
    return false;
  });
  
  xit("throws an error if barcode for size is already in use", function(){
    return false;
  });
  
  xit("displays registered sizes in a table", function(){
    return false;
  });
  
  
});