import React from "react";
import { startMining, stopMining ,getBalance} from "../actions/HomePageActions";

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ""
        }
        // startMining = startMining.bind(this);
        // stopMining = stopMining.bind(this);
    }
    onFormSubmit = ()=> {
        getBalance(this.state.address)
      }
    render() {
        console.log(this.state);
      return (
        <div class="jumbotron">
        <h1 class="display-4 text-center">POW-Blockchain</h1>
        <div class="d d-flex align-items-center justify-content-center" >
              <div class="p-2">
                  <Button variant="primary" onClick={startMining.bind(this)}> Start Mining</Button>
                </div>
                <div class="p-2">
                <Button  onClick={stopMining.bind(this)}> Stop Mining</Button>
                </div>
          </div>
          {/* <Button onClick={getBalance.bind(this)}> Get Balance</Button> */}
          <h3>Lookup your balance below</h3>
          <Form>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">0x</InputGroup.Text>
                    <FormControl
                    placeholder="Address"
                    aria-label="Address"
                    aria-describedby="basic-addon1"
                    onChange={e => this.setState({address:e.target.value})}
                    />
            </InputGroup>
            <Button variant="primary" onClick={this.onFormSubmit.bind(this)}>
                 Submit
            </Button>
          </Form>

      </div>

      )
    }
  }

export default HomePage