import axios from "axios";
var EC = require("elliptic").ec;
var ec = new EC("secp256k1");
const SHA256 = require("crypto-js/sha256");

let ENDPOINT_BASE = "http://localhost:8000/";
export const sendTransaction = (sender, sendAmt, recipientAdd, privateKey) => {
  const key = ec.keyFromPrivate(privateKey);
  const message = {
    sender: sender,
    amount: sendAmt,
    recipient: recipientAdd,
  };
  const msgHash = SHA256(message).toString();
  const signature = key.sign(msgHash);
  axios({
    method: "POST",
    url: ENDPOINT_BASE + "sendTransaction",
    data: {
      sender: sender,
      sendAmt: sendAmt,
      recipientAdd: recipientAdd,
      signature: signature,
      msgHash: msgHash,
    },
  }).then((response) => {
    console.log(response);
    if (response.data.error?.length) {
      alert(response.data.error);
    } else {
      alert(
        "Your transaction has successfully sent, your current balance is now: ",
        response.balance
      );
    }
  });
};
