import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Mainul = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
  gap: 10px;
  padding: 10px;
  color: white;
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
