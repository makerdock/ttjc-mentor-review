import React from "react";
import styled from "styled-components";
import { Container } from "../../utils/sharedStyles";

const HomePageContainer = styled.div``;

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomePageContainer>
      <Container>Home Page</Container>
    </HomePageContainer>
  );
};

export default HomePage;
