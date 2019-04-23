import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./style";
import { UserBlock } from "../../componentes/index";
import { SearchNumber } from "../../componentes/index";
import NumberInput from "../../componentes/NumberInput";
import axios from "axios";

class Application extends Component {
  render() {
    return (
      <Container>
        <UserBlock gridArea="user" />
        {/* <SearchNumber gridArea="search" /> */}
        <NumberInput gridArea="search" />
      </Container>
    );
  }
}

export default withRouter(Application);
