import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Header } from "./style";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

class Welcome extends Component {
  onSubmit = event => {
    event.preventDefault();
    window.location.assign("http://localhost:3000/Application");
  };

  render() {
    return (
      <Container>
        <div style={{ textAlign: "center" }}>
          <Header>
            Aplikacje Internetowe i Rozproszone
            <br />
            Projekt
            <br />
            Liczby Pierwsze
          </Header>

          <text>
            Dzięki tej aplikacji możesz sprawdzić
            <br /> czy dana liczba jest liczbą pierwszą
          </text>
        </div>

        <div>
          <text>Aby sprawdzić wybraną przez Ciebie liczbę:</text>
          <div
            style={{
              //flexDirection: "row",
              //textAlign: "center",
              //marginTop: "30px"
            }}
          >
            <Link
              to="/Login"
              style={{ textDecoration: "none", margin: 20 }}
            >
              <Button variant="contained" color="primary">
                Zaloguj
              </Button>
            </Link>
            <Link
              to="/Application"
              style={{ textDecoration: "none", margin: 20 }}
            >
              <Button variant="contained" color="primary">
                Zarejestruj
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(Welcome);
