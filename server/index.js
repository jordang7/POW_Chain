const express = require('express')
const app = express()
const port = 8000

const {startMining, stopMining} = require('./mine');
const {UTXOS} = require('./db')
const {PUBLIC_KEY} = require('./config')
var cors = require("cors");
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    //homepage
  res.send('Hello World!')
})

app.post('/startMining',(req,res) =>{
    startMining();
    res.send("Successfully started mining")
})

app.post('/stopMining',(req,res) =>{
    stopMining();
    res.send("Successfully stopped mining")
})

app.post('/getBalance', async (req, res) => {
  //homepage
  let public_key = req.body.address
  console.log(public_key)
  const ourUTXOs = UTXOS.filter(x => x.owner === public_key && !x.spent);
  const sum = ourUTXOs.reduce((p,c) => p+c.amount ,0);
  //console.log(sum)
  res.send(sum.toString())
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})









// const server = jayson.server({
//     startMining: function(_,callback){
//         callback(null,"success");
//         startMining()
//     },
//     stopMining: function(_,callback){
//         callback(null,"success!!");
//         stopMining()
//     },
//     getBalance: function(address,callback){
//         const ourUTXOs = UTXOS.filter(x => x.owner === PUBLIC_KEY && !x.spent);

//         const sum = ourUTXOs.reduce((p,c) => p+c.amount ,0);
//         console.log(sum)
//         callback(null,"success -> "+sum,);
//     },
// })

// server.http().listen(3000)