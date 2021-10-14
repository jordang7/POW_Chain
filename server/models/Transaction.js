const {UTXOS} = require('./../db')

class Transaction {
    constructor(inputs,outputs) {
        this.inputs = inputs;
        this.outputs = outputs;
    }

    execute() {
        this.inputs.forEach((input) => {
            input.spent = true;
        });
        this.outputs.forEach((output) => {
            UTXOS.push(output)
        });
    }
}

module.exports = Transaction