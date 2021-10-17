import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { sendTransaction } from "../actions/TransactionsActions";

class MakeTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: "",
      sendAmt: 0,
      recipientAdd: "",
      privateKey: "",
    };
  }
  onFormSubmit = () => {
    let { sender, sendAmt, recipientAdd, privateKey } = this.state;

    sendTransaction(sender, sendAmt, recipientAdd, privateKey);
    // const request = new Request(`${server}/send`, { method: "POST", body });
  };

  render() {
    return (
      <div>
        <h4 class="text-center">Your Address</h4>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">0x</InputGroup.Text>
          <FormControl
            placeholder="Your address"
            aria-label="Your address"
            aria-describedby="basic-addon1"
            onChange={(e) => this.setState({ sender: e.target.value })}
          />
        </InputGroup>
        <Form>
          <h4 class="text-center">
            Input the address you would like to start mining with
          </h4>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
            <FormControl
              placeholder="Send Amount"
              aria-label="Send Amount"
              aria-describedby="basic-addon1"
              onChange={(e) => this.setState({ sendAmt: e.target.value })}
            />
            <InputGroup.Text id="basic-addon1">0x</InputGroup.Text>
            <FormControl
              placeholder="Recipient Address"
              aria-label="Recipient Address"
              aria-describedby="basic-addon1"
              onChange={(e) => this.setState({ recipientAdd: e.target.value })}
            />
            <FormControl
              placeholder="Private Key"
              aria-label="Private Key"
              aria-describedby="basic-addon1"
              onChange={(e) => this.setState({ privateKey: e.target.value })}
            />
          </InputGroup>
          <div class="text-center pb-3">
            <Button variant="primary" onClick={this.onFormSubmit.bind(this)}>
              Transfer Amount
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default MakeTransactions;
