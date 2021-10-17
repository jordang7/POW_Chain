import React from "react";
import {
  startMining,
  stopMining,
  lookUpBalance,
} from "../actions/HomePageActions";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      isMining: false,
    };
  }
  onFormSubmit = () => {
    this.setState({ isMining: true });
    startMining(this.state.address);
  };
  onStopMining = () => {
    this.setState({ isMining: false });
    stopMining();
  };
  render() {
    return (
      <div>
        <div class="d d-flex align-items-center justify-content-center">
          {/* <h2>Input your address to start mining</h2> */}
          <Form>
            <h4 class="text-center">
              {" "}
              Input the address you would like to start mining with
            </h4>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">0x</InputGroup.Text>
              <FormControl
                placeholder="Address"
                aria-label="Address"
                aria-describedby="basic-addon1"
                onChange={(e) => this.setState({ address: e.target.value })}
              />
            </InputGroup>
            <div class="text-center pb-3">
              {!this.state.isMining ? (
                <Button
                  variant="primary"
                  onClick={this.onFormSubmit.bind(this)}
                >
                  {" "}
                  Start Mining
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={this.onStopMining.bind(this)}
                >
                  {" "}
                  Stop Mining
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default HomePage;
