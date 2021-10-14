const Transaction = require('./models/Transaction')
const UTXO = require('./models/UTXO')
const Block = require('./models/Block')
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const {PRIVATE_KEY,PUBLIC_KEY} = require('./config.js')
const db = require('./db');
const BLOCK_REWARD = 10;

let mining = true;
mine();

function startMining(){
    mining=true;
    mine();
}

function stopMining(){
    mining= false;
}

function mine(){
    if(!mining){
        return;
    }

    const block = new Block()

    const COINBASE_UTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD)
    const COINBASE_TX = new Transaction([],[COINBASE_UTXO])
    block.addTransaction(COINBASE_TX)

    while(BigInt('0x0' + block.hash()) >= TARGET_DIFFICULTY){
        block.nonce++;
    }

    block.execute()

    db.blockchain.addBlock(block);
    console.log(`Just mined block ${db.blockchain.blockHeight()} with a has of ${block.hash()} and a nonce of ${block.nonce}`)
    setTimeout(mine, 5000);
}

module.exports= {
    startMining,
    stopMining
}