import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MainGrid = styled.div`
  display: grid;
  height: 600px;
  width: 600px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  margin: auto;
  margin-bottom: 50px;
`;

const GridItem = styled.div`
  background-color: purple;
  text-align: center;
`;
const Genre = () => {
  const navigate = useNavigate();

  const handleNavigation = (genre: string) => {
    navigate(`/genrecollection/${genre}`);
  };
  const genres = [
    "shooter",
    "moba",
    "fps",
    "racing",
    "rpg",
    "fighting",
    "stragey",
    "horror",
    "sports",
  ];

  return (
    <MainGrid>
      {genres.map((genre) => (
        <GridItem
          key={genre}
          onClick={() => handleNavigation(genre)}
          style={{ cursor: "pointer" }}
        >
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </GridItem>
      ))}
    </MainGrid>
  );
};

export default Genre;
