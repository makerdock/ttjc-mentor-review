import React from "react";
import styled from "styled-components";

import { Container } from "../../utils/sharedStyles";

const NavbarContainer = styled.div`
  padding: 1rem 0;
  position: sticky;
  top: 0;

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: min-content min-content min-content;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Container>
        <span>TTJC Reviews</span>
        <div className="tabs">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Button
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Button
          </button>
        </div>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
