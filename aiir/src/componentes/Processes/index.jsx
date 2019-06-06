import React from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "../../ExportToExcel";
import { Container } from "./style";

export default class Processes extends React.Component {
  state = {
    processes: []
  };

  submitLogin(e) {
    e.preventDefault();

    axios
      .get("http://20.188.36.125:5000/tasks", {
        headers: {
          "Access-Control-Allow-Origin": "http://20.188.36.125:5000",
          "Access-Control-Allow-Credentials": "include",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        credentials: "include"
      })
      .then(res => res.data)
      .then(processes =>
        this.setState({ processes }, () =>
          console.log("Pocesses fetched...", processes)
        )
      );
  }

  render() {
    const columns = [
      {
        Header: "Process ID",
        accessor: "name",
        width: 350
      },
      {
        Header: "args",
        accessor: "args",
        width: 200
      },
      {
        Header: "stdout",
        accessor: "stdout",
        width: 300
        //sortable: false;
      },
      {
        Header: "return code",
        accessor: "returncode",
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "state",
        accessor: "state",
        style: {
          textAlign: "center"
        }
      },
      {
        Header: () => (
          <span>
            <i className="fa-tasks" /> Progress
          </span>
        ),
        accessor: "progress",
        filterable: false,
        Cell: row => (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px"
            }}
          >
            <div
              style={{
                width: `${row.value}%`,
                height: "100%",
                backgroundColor:
                  row.value > 66
                    ? "#85cc00"
                    : row.value > 33
                    ? "#ffbf00"
                    : "#ff2e00",
                borderRadius: "2px",
                transition: "all .2s ease-out"
              }}
            />
          </div>
        )
      }
    ];

    return (
      <Container>
        <ReactTable
          columns={columns}
          data={this.props.processes}
          filterable
          defaultPageSize={10}
          noDataText={"Brak wyników do wyświetlenia"}
        >
          {(state, filtredData, instance) => {
            this.ReactTable = state.pageRows.map(post => {
              return post._original;
            });
            return (
              <div>
                {filtredData()}
                <ExportToExcel post={this.ReactTable} />
              </div>
            );
          }}
        </ReactTable>
        <button onClick={this.submitLogin.bind(this)}>Refresh</button>
      </Container>
    );
  }
}

// {this.state.customers.map(customer =>
//   <li key={customer.id}>{customer.id} {customer.args} {customer.stdout} {customer.stderr}</li>
// )}

// export default class Processes extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       processes: []
//     };
//   }

//   componentDidMount() {
//     axios.get('http://localhost:5001/tasks')
//       .then(res => res.data)
//       .then(processes => this.setState({processes}, () => console.log('Processes fetched...', processes)));
//   }

//   render() {
//     return (
//       <div>
//         <h2>Processes</h2>
//         <ul>
//         {this.state.processes.map(process =>
//           <li key={process.id}>{process.id} {process.args} {process.stdout} {process.stderr}</li>
//         )}
//         </ul>
//       </div>
//     );
//   }
// }
