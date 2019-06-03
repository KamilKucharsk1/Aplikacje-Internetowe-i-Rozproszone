import React from "react";
import { Container } from "./style";
import axios from "axios";

export default class SearchNumber extends React.Component {
  state = {
    numberToCheck: ""
  };

  handleChange = event => {
    this.setState({ numberToCheck: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("http://40.89.186.174:5000/task", {
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
          <label>
            Liczba do sprawdzenia:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Check</button>
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
