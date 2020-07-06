import React from "react";
import styled from "styled-components";
import { Container } from "../../utils/sharedStyles";

const HomePageContainer = styled.div``;

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomePageContainer>
      <Container>
        <div className="md:flex bg-white rounded-lg p-6">
          <img
            className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
            src="avatar.jpg"
          />
          <div className="text-center md:text-left">
            <h2 className="text-lg">Erin Lindford</h2>5{" "}
            <div className="text-purple-500">Product Engineer</div>6{" "}
            <div className="text-gray-600">erinlindford@example.com</div>7{" "}
            <div className="text-gray-600">(555) 765-4321</div>8{" "}
          </div>
        </div>
      </Container>
    </HomePageContainer>
  );
};

export default HomePage;
