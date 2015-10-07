if(Meteor.isServer){
    var Xero = Meteor.npmRequire('xero');
    var rsaPrivateKey = Assets.getText('privatekey.pem');
    var xero = new Xero('P9VXD4MCMNO7JT2LEJHQOM4AJVHVND', 'BQNENFBNYXM2BJUVLOMVV1VV1YISRX', rsaPrivateKey);
    
    Meteor.methods({
       xeroGetContacts : function(){
           xero.call('GET', '/Contacts', null, function(err, json) {
               if (err) {
                   console.log(err);
                   return Meteor.error('400', 'Unable to contact Xero');
               }
               console.log(json);
               return json;
           });
       },
       xeroGetInvoices : function(){
           xero.call('GET', '/Invoices', null, function(err, json) {
               if (err) {
                   console.log(err);
                   return err;
               }
               console.log(json);
               return json;
           });
       },
    });
}