import React from "react";
import styled from "styled-components";
import Genre from "../components/Genre";
import SearchComponent from "../components/SearchComponent";

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.div`
  color: white;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  padding: 0;
  h1 {
    font-size: 96px;
    margin: 0px;
  }

  span {
    font-size: 48px;
    margin: 0px;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 38px;
    }

    span {
      font-size: 20px;
    }
  }
`;
const HomePage = () => {
  return (
    <MainLayout>
      <Heading>
        <h1>GameHaven</h1>
        <span>Where Every Game Finds a Home</span>
      </Heading>
      <SearchComponent />
      <Genre />
    </MainLayout>
  );
};

export default HomePage;
