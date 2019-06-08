import React from "react";
import { Container } from "./style";
import axios from "axios";

export default class SearchNumber extends React.Component {
  state = {
    numberToCheck: "",
    algorithm: "",
    processes: ""
  };

  constructor() {
    super();
    this.state = { isChecked: false };
    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  handleChange = event => {
    this.setState({ numberToCheck: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("http://40.89.175.173:5000/task", {
        args: this.state.numberToCheck
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Select algorithm:</label>
          <br />
          <br />
          <label style={{ paddingTop: 1 }}>
            Number to check:
            <input
              type="text"
              name="name"
              style={{ width: 400 }}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" name="btn_fate">
            SEND
          </button>
          <br />

          {/* <label style={{ paddingTop: 1 }}>
            Number to check:
            <input type="text" name="btn_fermat" onChange={this.handleChange} />
          </label>
          <button type="submit">Fermat</button>
          <br />

          <label style={{ paddingTop: 1 }}>
            Number to check:
            <input type="text" name="btn_naive" onChange={this.handleChange} />
          </label>
          <button type="submit">Naive</button>
          <br />

          <label style={{ paddingTop: 1 }}>
            Number to check:
            <input
              type="text"
              name="btn_solovay"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Solovay</button> */}
          <br />
        </form>
      </div>
    );
  }
}

// return (
//   <Container>
//     <form id="postData">
//       <input type="text" name="" id="title" />
//       <button type="submit">Send to check</button>

//     </form>

//     {console.log()}
//   </Container>
// );
