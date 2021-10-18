const { UTXOS } = require("./../db");

class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  execute() {
    this.inputs.forEach((input) => {
      for (let utxo of UTXOS) {
        if (
          utxo.owner === input.owner &&
          utxo.amount === input.amount &&
          utxo.spent === input.spent
        ) {
          utxo.spent = true;
          break; // only spend the first UTXO that matches the criteria
        }
      }
    });
    //console.log("OUTPUT: ", this.outputs);
    this.outputs.forEach((output) => {
      UTXOS.push(output);
    });
  }
}

module.exports = Transaction;
