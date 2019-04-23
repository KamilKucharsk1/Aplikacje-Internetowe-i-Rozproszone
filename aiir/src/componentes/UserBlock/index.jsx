import React from "react";
import { Container } from "./style";

export default ({ gridArea }) => {
  return (
    <Container gridArea={gridArea}>
      <div className="user">
        <button>wyloguj</button>
      </div>
    </Container>
  );
};
