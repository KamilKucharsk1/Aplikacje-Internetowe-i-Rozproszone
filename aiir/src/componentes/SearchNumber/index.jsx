// import React from "react";
// import { Container } from "./style";
// import axios from "axios";

// export default class SearchNumber extends React.Component {
//   state = {
//     numberToCheck: []
//   };

//   componentDidMount() {
//     axios.get("http://localhost:3000/Application").then(res => {
//       console.log(res);
//       this.setState({ state: res.data });
//     });
//   }

//   render() {
//     return (
//       //<Container /*gridArea={gridArea}*/ style={{ display: "inline-block" }}>
//       <ul>{this.state.numberToCheck}</ul>
//       // </Container>
//     );
//   }

//   /*
// export default ({ gridArea }) => {
//     /*return (
//     <Container gridArea={gridArea} style={{ display: "inline-block" }}>
//       <form method="POST" action="/Application">
//         <input type="text" name="numberToCheck" placeholder="Wprowadź liczbę" />
//         <input type="submit" />
//         <div className="search" style={{ display: "inline-block" }}>
//           <button>szukaj</button>
//         </div>
//       </form>
//     </Container>
//   );*/
// }
