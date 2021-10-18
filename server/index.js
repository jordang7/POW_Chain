const express = require("express");
const app = express();
const port = 8000;

const { startMining, stopMining } = require("./mine");
const { UTXOS } = require("./db");
var EC = require("elliptic").ec;
var ec = new EC("secp256k1");
var cors = require("cors");
const Transaction = require("./models/Transaction");
const UTXO = require("./models/UTXO");
const Block = require("./models/Block");
const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  //homepage
  res.send("Hello World!");
});

app.post("/startMining", (req, res) => {
  let public_key = req.body.address;
  startMining(public_key);
  res.send("Successfully started mining");
});

app.post("/stopMining", (req, res) => {
  stopMining();
  res.send("Successfully stopped mining");
});

app.post("/getBalance", async (req, res) => {
  //homepage
  let public_key = req.body.address;
  const ourUTXOs = UTXOS.filter((x) => x.owner === public_key && !x.spent);
  const sum = ourUTXOs.reduce((p, c) => p + c.amount, 0);
  //console.log(sum)
  res.send(sum.toString());
});

let accounts = {};

let count = 0;
while (count < 3) {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic().encode("hex");
  const privateKey = key.getPrivate().toString(16);
  accounts[count] = {
    publicKey: publicKey,
    privateKey: privateKey,
    balance: 0,
  };
  count++;
}

console.log("Available Accounts");
console.log("===================");
for (let i in accounts) {
  console.log(`(${i}) ` + accounts[i].publicKey);
}
console.log("Private Keys");
console.log("===================");
for (let i in accounts) {
  console.log(`(${i}) ` + accounts[i].privateKey + ` (${accounts[i].balance})`);
}

app.post("/sendTransaction", (req, res) => {
  const { sender, sendAmt, recipientAdd, signature, msgHash } = req.body;
  try {
    const key = ec.keyFromPublic(sender, "hex");
    if (key.verify(msgHash, signature)) {
      let UTXO_IN_ARR = [];
      let UTXO_OUT_ARR = [];
      let runningValue = sendAmt;
      const block = new Block();
      const ourUTXOs = UTXOS.filter((x) => x.owner === sender && !x.spent);

      // TODO only works for exact UTXO amounts or smaller amounts
      // Want to create logic if UTXO is larger than amount sent
      ourUTXOs.forEach((utxo) => {
        if (utxo.amount <= runningValue) {
          UTXO_IN_ARR.push(new UTXO(sender, utxo.amount));
          UTXO_OUT_ARR.push(new UTXO(recipientAdd, utxo.amount));
          runningValue -= utxo.amount;
        }
      });
      if (runningValue > 0) {
        res.send({ error: "Insufficient Funds" });
      } else {
        const NEW_TX = new Transaction(UTXO_IN_ARR, UTXO_OUT_ARR);
        block.addTransaction(NEW_TX);
      }
      block.execute();
      db.blockchain.addBlock(block);

      res.send("Transaction successful");
    } else {
      res.send({ error: "Incorrect Private Key!" });
    }
  } catch (e) {
    console.log(e);
    res.send({ error: "Invalid address" });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
