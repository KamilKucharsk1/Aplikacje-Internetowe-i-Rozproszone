import React, { Component } from "react";
import axios from "axios";
//import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Welcome, Application, Login } from "./views";
import "./App.css";
import Cookies from "js-cookie";

class App extends Component {
  state = {
    username: Cookies.get("username")
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Welcome} />
          <Route path="/Application" component={Application} />
          <Route path="/Login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
