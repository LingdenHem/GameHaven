import React from "react";
import styled from "styled-components";

const Mainul = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
  gap: 10px;
  padding: 10px;
`;

const Navbar = () => {
  return (
    <div>
      <Mainul>
        <li>Login</li>
        <li>Profile</li>
      </Mainul>
    </div>
  );
};

export default Navbar;
