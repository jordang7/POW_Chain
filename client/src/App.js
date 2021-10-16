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
function App() {
  return (
      <Router>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
