Meteor.startup(function(){
    if(CraftyCart.find().count() < 1){
        var config = {
            baseUrl : 'http://localhost:3000/',
            apikey : 'Y291GZl3RHfKzm9F3Sc5ERK3lG1Vyu87',
            coupons : {
                apiEndpoint : 'api/v1/coupons',
                values : [
                    {
                        description : '10% OFF',
                        value : 10,
                        coupon : '10OFFPLEASE'
                    },
                    {
                        description : '20% OFF',
                        value : 20,
                        coupon : 'AWESOMECUSTOMER'
                    }
                ]
            },
            products : {
                apiEndpoint : 'api/v1/products'
            },
            orders : {
                apiEndpoint : 'api/v1/orders'
            }
        };
      CraftyCart.insert(config);       
    }
});