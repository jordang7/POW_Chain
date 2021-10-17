import React from "react";
import { startMining, stopMining ,lookUpBalance} from "../actions/HomePageActions";

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

class GetBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
        }
        // startMining = startMining.bind(this);
        // stopMining = stopMining.bind(this);
    }
    onFormSubmit = ()=> {
        lookUpBalance(this.state.address)
      }
    render() {
      return (
        <div class="d d-flex align-items-center justify-content-center" >
            <Form>
                <h5 class="text-center">Lookup your balance below</h5>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">0x</InputGroup.Text>
                            <FormControl
                            placeholder="Address"
                            aria-label="Address"
                            aria-describedby="basic-addon1"
                            onChange={e => this.setState({address:e.target.value})}
                            />
                    </InputGroup>
                    <div class="text-center pb-3">
                        <Button variant="primary" onClick={this.onFormSubmit.bind(this)}>
                            Submit
                        </Button>
                    </div>
            </Form>
        </div>


      )
    }
  }

export default GetBalance


