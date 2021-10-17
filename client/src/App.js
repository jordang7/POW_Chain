import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./components/HomePage"
import GetBalance from "./components/GetBalance"

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'

function App() {
  return (

    <div>
       <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/Home">POW-Blockchain</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/Home">Home</Nav.Link>
                <Nav.Link href="/getBalance">Lookup Balance</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


          <Switch>
            <Route path="/Home">
              <HomePage />
            </Route>
            <Route path="/getBalance">
              <GetBalance />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
