import React from "react";
import styled from "styled-components";
import Genre from "../components/Genre";

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
`;
const HomePage = () => {
  return (
    <>
      <Heading>
        <h1>GameHaven</h1>
        <span>Where Every Game Finds a Home</span>
      </Heading>
      <Genre />
    </>
  );
};

export default HomePage;
