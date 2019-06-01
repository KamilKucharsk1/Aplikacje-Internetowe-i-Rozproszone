import React, { Component } from "react";
import axios from "axios";
//import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Welcome, Application, Login } from "./views";
import "./App.css";



class App extends Component {




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