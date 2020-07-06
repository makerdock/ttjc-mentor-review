import React from "react";
import styled from "styled-components";

import { Container } from "../../utils/sharedStyles";

const NavbarContainer = styled.div`
  padding: 1rem 0;
  position: sticky;
  top: 0;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Container>App Name</Container>
    </NavbarContainer>
  );
};

export default Navbar;
