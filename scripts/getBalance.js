const client = require('./client');



client.request('getBalance', [], function(err,response){
    if(err) throw err;
    console.log(response.result);
})