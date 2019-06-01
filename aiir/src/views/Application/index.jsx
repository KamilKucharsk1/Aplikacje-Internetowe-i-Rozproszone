import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./style";
import { UserBlock } from "../../componentes/index";
import { SearchNumber } from "../../componentes/index";
import {Processes} from "../../componentes/index";
//import NumberInput from "../../componentes/NumberInput";
import axios from "axios";
import ReacTable from "react-table";
import "react-table/react-table.css";
import { Header } from "../../componentes/index";
 
class Application extends Component { 
  
  constructor() {
    super();
    this.state = { 
      processes: []
    }; 
  }
  
  componentDidMount() { 
    axios.get('http://localhost:5001/tasks') 
      .then(res => res.data)
      .then(processes => this.setState({processes}, () => console.log('Pocesses fetched...', processes)));
  }

  render() {  
    return <Fragment>  
      
      <Container>
      {/* <Header /> */}
        <UserBlock gridArea="user" />
        <SearchNumber />
        {/* <SearchNumber gridArea="search" /> */}
        {/* <NumberInput gridArea="search" /> */}
        <Processes processes={this.state.processes} gridArea="processes"/>
      </Container>
      </Fragment>
     
  }
}

export default withRouter(Application);
 