const express = require("express");
const app = express();
const port = 8000;

const { startMining, stopMining } = require("./mine");
const { UTXOS } = require("./db");
var EC = require("elliptic").ec;
var ec = new EC("secp256k1");
var cors = require("cors");
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
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});
app.post("/sendTransaction", (req, res) => {
  const { sender, amount, recipient, signature, msgHash } = req.body;
  try {
    const key = ec.keyFromPublic(sender, "hex");
    if (key.verify(msgHash, signature)) {
      for (let i in accounts) {
        if (accounts[i].publicKey == sender) {
          accounts[i].balance -= amount;
        } else if (accounts[i].publicKey === recipient) {
          (accounts[i] || 0) + amount;
        }
      }
      balances[recipient] = (balances[recipient] || 0) + amount;
      res.send({ balance: balances[sender] });
    } else {
      res.send({ error: "Incorrect Private Key!" });
    }
  } catch (e) {
    res.send({ error: "Invalid address" });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
