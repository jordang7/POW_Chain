const { ServerResponse } = require('http');
const jayson = require('jayson')
const {startMining, stopMining} = require('./mine');
const {UTXOS} = require('./db')
const {PUBLIC_KEY} = require('./config')


const server = jayson.server({
    startMining: function(_,callback){
        callback(null,"success");
        startMining()
    },
    stopMining: function(_,callback){
        callback(null,"success!!");
        stopMining()
    },
    getBalance: function(address,callback){
        const ourUTXOs = UTXOS.filter(x => x.owner === PUBLIC_KEY && !x.spent);

        const sum = ourUTXOs.reduce((p,c) => p+c.amount ,0);
        console.log(sum)
        callback(null,"success -> "+sum,);
    },
})

server.http().listen(3000)