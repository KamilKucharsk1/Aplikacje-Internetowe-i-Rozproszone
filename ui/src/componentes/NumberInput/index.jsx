import React from "react";
import axios from "axios";
/*
export default class NumberInput extends React.Component {


  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/tasks')
      .then(res => res.data)
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li key={customer.id}>{customer.id} {customer.args} {customer.stdout} {customer.stderr}</li>
        )}
        </ul>
      </div>
    );
  }
}



*/












 /* state = {
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
  }*/
/*
    axios.post(`https://dog.ceo/api/breeds/image/random`, { number }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };
*/
/*
   onSearchSubmit() {
     axios.get("https://dog.ceo/api/breeds/image/random").then(res => {
       console.log(res.data);
       this.setState({ isPrimary: res.data.id });
     });
   }
  
*//*
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
*/



