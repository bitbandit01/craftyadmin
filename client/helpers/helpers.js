Template.registerHelper('formatKg', function(input){
    return gToKg(input) + 'Kg';
});

Template.registerHelper('formatDate', function(date){
   return moment(date).format('LLLL');
});