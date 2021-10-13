const { ServerResponse } = require('http');
const jayson = require('jayson')
const {startMining, stopMining} = require('./mine');

const server = jayson.server({
    startMining: function(_,callback){
        callback(null,"success");
        startMining()
    },
    stopMining: function(_,callback){
        callback(null,"success!!");
        stopMining()
    },
})

server.http().listen(3000)