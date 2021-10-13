const Blockchain = require('./models/Blockchain.js');
const Block = require('./models/Block')
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));

const db = require('./db');

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
    while(BigInt('0x0' + block.hash()) >= TARGET_DIFFICULTY){
        block.nonce++;
    }


    db.blockchain.addBlock(block);
    console.log(`Just mined block ${db.blockchain.blockHeight()} with a has of ${block.hash()} and a nonce of ${block.nonce}`)
    setTimeout(mine, 5000);
}

module.exports= {
    startMining,
    stopMining
}