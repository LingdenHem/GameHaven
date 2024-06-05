import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getGames } from "../utils/fetchGames";

const Genre = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState<string[]>([]);
  const handleNavigation = (genre: string) => {
    navigate(`/genrecollection/${genre}`);
  };

  async function fetchData() {
    const { genres } = await getGames();

    console.log(genres);
    setGenre(genres);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainGrid>
      {genre &&
        genre.map((item) => (
          <GridItem
            key={item}
            onClick={() => handleNavigation(item)}
            style={{ cursor: "pointer" }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </GridItem>
        ))}
    </MainGrid>
  );
};

export default Genre;

const MainGrid = styled.div`
  display: grid;
  height: 600px;
  width: 600px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 14px;
  margin: 20px auto 50px auto;
  margin-top: 10px;
  @media (max-width: 640px) {
    display: flex;
    flex-wrap: wrap;
    height: 200px;
    width: 180px;
    align-items: center;
    justify-content: center;
  }
`;

const GridItem = styled.div`
  background-color: #f6f6f618;
  text-align: center;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  border: #ffffff3f 1px solid;
  font-family: "Orbitron", sans-serif;
  color: white;

  backdrop-filter: blur(10px);

  @media (max-width: 640px) {
    min-width: 350px;
    min-height: 110px;
  }
`;
