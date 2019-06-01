import styled from "styled-components";

export const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  justify-self: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
`;
