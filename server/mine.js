const Transaction = require("./models/Transaction");
const UTXO = require("./models/UTXO");
const Block = require("./models/Block");
var TARGET_DIFFICULTY = 3;
const db = require("./db");
const BLOCK_REWARD = 10;

let mining = false;

function calculateDifficulty(difficulty) {
  return BigInt("0x" + "0".repeat(difficulty) + "F".repeat(64 - difficulty));
}

function startMining(public_key) {
  mining = true;
  mine(public_key);
}

function stopMining() {
  mining = false;
}

function mine(public_key) {
  if (!mining) {
    return;
  }

  const block = new Block();

  const COINBASE_UTXO = new UTXO(public_key, BLOCK_REWARD);
  const COINBASE_TX = new Transaction([], [COINBASE_UTXO]);
  block.addTransaction(COINBASE_TX);

  while (
    BigInt("0x0" + block.hash()) >= calculateDifficulty(TARGET_DIFFICULTY)
  ) {
    block.nonce++;
  }
  const prevBlock = db.blockchain.blocks[db.blockchain.blocks.length - 1]
    ? db.blockchain.blocks[db.blockchain.blocks.length - 1]
    : null;

  if (prevBlock !== null && prevBlock.timestamp + 500 > block.timestamp) {
    TARGET_DIFFICULTY += 1;
  } else if (
    prevBlock !== null &&
    prevBlock.timestamp + 600 < block.timestamp
  ) {
    TARGET_DIFFICULTY -= 1;
  }

  block.execute();

  db.blockchain.addBlock(block);

  console.log(
    `Just mined block ${db.blockchain.blockHeight()} with a hash of ${block.hash()} and a nonce of ${
      block.nonce
    } with a difficulty of ${TARGET_DIFFICULTY}`
  );
  setTimeout(mine, 1);
}

module.exports = {
  startMining,
  stopMining,
};
