import styled from "styled-components";



export const Container = styled.div`
  height: 100vh;
 
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template: "top" "mid" "bot" /1fr;
`;

export const Header = styled.div`
  font-family: "Roboto:700i", sans-serif;
  font-size: 1.5em;
  position: relative;
  text-align: center;
  padding: 14px;
  border-radius: 14px;
  background-color: #c1bdbd;
`;

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1.5em;
  padding: 0.25em 1em;
  height: 2.5em;
`;
