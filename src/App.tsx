import React from "react";
import "./App.css";
import styled from "styled-components";
import Navbar from "./Navbar";

const MainHeading = styled.h1`
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 60px;
  text-align: center;
  color: black;
`;

function App() {
  return (
    <>
      <Navbar />
      <MainHeading>GameHaven</MainHeading>
    </>
  );
}

export default App;
