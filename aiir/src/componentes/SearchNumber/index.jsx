import React from "react";
import { Container } from "./style";
import axios from "axios";

export default class SearchNumber extends React.Component {
  state = {
    numberToCheck: []
  };

//   constructor(){

//   document.getElementById('postData').addEventListener('submit', postData);

//   function postData(event){
//              event.preventDefault();
 
//              let tittle = document.getElementById('tittle').value;
//              let body = document.getElementById('body').value;
 
//              fetch('localhost://5000/tasks', {
//                  method: 'POST',
//                  headers : new Headers(),
//                  body:JSON.stringify({tittle:tittle, body:body})
//              }).then((res) => res.json())
//              .then((data) =>  console.log(data))
//              .catch((err)=>console.log(err))
//          }


//         }


// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });


  //document.get


  render() {
   
    return (
      <Container>
        <form id="postData">
            <input type="text" name="" id="title"/>  
            <button type="submit">Send to check</button>

        </form>


        {console.log()}
    </Container>
  );
}
}

// <Container style={{ display: "inline-block" }}>
    //   <form method="POST" action="/Application">
    //     <input type="text" name="numberToCheck" placeholder="Wprowadź liczbę" />
    //     <input type="submit" />
    //     <div className="search" style={{ display: "inline-block" }}>
    //       <button>szukaj</button>
    //     </div>
    //   </form>
    // </Container>