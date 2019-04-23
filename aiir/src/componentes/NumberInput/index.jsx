import React from "react";
import axios from "axios";

export default class NumberInput extends React.Component {
  state = {
    number: [],
    isPrimary: []
  };

  handleChange = event => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const number = {
      number: this.state.number
    };

    axios.post(`http://localhost:5000/`, { number }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  onSearchSubmit() {
    axios.get("http://localhost:5000/").then(res => {
      console.log(res);
      this.setState({ isPrimary: res });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Liczba:
          <input type="text" number="number" onChange={this.handleChange} />
        </label>
        <button onSubmit={this.onSearchSubmit}>Sprawdź</button>
        <label>Wynik:{this.state.isPrimary}</label>
      </form>
    );
  }
}
