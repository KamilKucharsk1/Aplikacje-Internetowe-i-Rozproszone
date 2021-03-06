import React from "react";
import ReactDom from "react-dom";
import { withRouter } from "react-router-dom";
import { MainContainer } from "../style";
import axios from "axios";
// import { Cookie } from "react-cookie;";

import "./_loginSty.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  render() {
    return (
      <MainContainer>
        <div className="root-container">
          <div className="box-controller">
            <div
              className={
                "controller " +
                (this.state.isLoginOpen ? "selected-controller" : "")
              }
              onClick={this.showLoginBox.bind(this)}
            >
              Login
            </div>
            <div
              className={
                "controller " +
                (this.state.isRegisterOpen ? "selected-controller" : "")
              }
              onClick={this.showRegisterBox.bind(this)}
            >
              Register
            </div>
          </div>

          <div className="box-container">
            {this.state.isLoginOpen && <LoginBox />}
            {this.state.isRegisterOpen && <RegisterBox />}
          </div>
          {console.log(this.state.value)}
        </div>
      </MainContainer>
    );
  }
}

class LoginBox extends React.Component {
  // state = {
  //   username: "",
  //   password: ""
  // };

  constructor(props) {
    super(props);
    this.state = {
      username: "Jan",
      password: "Kowalski"
    };
  }

  submitLogin(e) {
    e.preventDefault();

    // axios({
    //   method: "POST",
    //   url: "/login",
    //   baseURL: "http:/40.89.186.174:5000/",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   data: { username: "John", password: "Doe" }
    // });

    axios
      .post(
        "http://40.89.175.173:5000/login",
        {
          username: this.state.username,
          password: this.state.password
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://40.89.175.173:5000",
            "Access-Control-Allow-Credentials": "include",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
          },
          credentials: "include"
        }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.request);
        console.log(document.cookie);
        console.log("aaaaaaa");
        //console.log(document.cookie);
        console.log(res.data.username);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this.submitLogin.bind(this)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: [],
      pwdState: null
    };
  }

  showValidationErr(elm, msg) {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  }

  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");

    this.setState({ pwdState: "weak" });
    if (e.target.value.length > 8) {
      this.setState({ pwdState: "medium" });
    }
    if (e.target.value.length > 12) {
      this.setState({ pwdState: "strong" });
    }
  }

  submitRegister(e) {
    if (this.state.username == "") {
      this.showValidationErr("username", "Username Cannot be empty!");
    }
    if (this.state.email == "") {
      this.showValidationErr("email", "Email Cannot be empty!");
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Password Cannot be empty!");
    }

    e.preventDefault();

    axios
      .post("http://40.89.175.173:5000/register", {
        // username: "Jack",
        // password: "Doe"
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let usernameErr = null,
      passwordErr = null,
      emailErr = null;

    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "email") {
        emailErr = err.msg;
      }
    }

    let pwdWeak = false,
      pwdMedium = false,
      pwdStrong = false;

    if (this.state.pwdState == "weak") {
      pwdWeak = true;
    } else if (this.state.pwdState == "medium") {
      pwdWeak = true;
      pwdMedium = true;
    } else if (this.state.pwdState == "strong") {
      pwdWeak = true;
      pwdMedium = true;
      pwdStrong = true;
    }

    console.log(usernameErr, passwordErr, emailErr);

    return (
      <div className="inner-container">
        <div className="header">Register</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onUsernameChange.bind(this)}
            />
            <small className="danger-error">
              {usernameErr ? usernameErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this.onEmailChange.bind(this)}
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onPasswordChange.bind(this)}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>

          {this.state.password && (
            <div className="password-state">
              <div className={"pwd pwd-weak " + (pwdWeak ? "show" : "")} />
              <div className={"pwd pwd-medium " + (pwdMedium ? "show" : "")} />
              <div className={"pwd pwd-strong " + (pwdStrong ? "show" : "")} />
            </div>
          )}

          <button
            type="button"
            className="login-btn"
            onClick={this.submitRegister.bind(this)}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
