import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  min-height: 100vh;
  height: auto;
  grid-template-rows: 0.2fr 0.6fr 1fr 2.2fr;
  grid-template-areas: ". user" "head head" "search search" "progress history";
`;
