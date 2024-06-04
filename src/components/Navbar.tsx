import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Mainul = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 24px;
  padding: 10px;
  margin: 0;

  text-align: center;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  border-bottom: #ffffff3f 1px solid;
  font-family: "Orbitron", sans-serif;

  backdrop-filter: blur(10px);

  a {
    color: white;
    text-decoration: none;
  }
`;

const Navbar = () => {
  return (
    <Mainul>
      <Link to="/">Home</Link>
      <Link to="/profile/">Profile</Link>
    </Mainul>
  );
};

export default Navbar;
