const { builtinModules } = require('module');
const Blockchain = require('./models/Blockchain.js');
const db = {
    blockchain: new Blockchain(),
    UTXOS: [],
}

module.exports = db