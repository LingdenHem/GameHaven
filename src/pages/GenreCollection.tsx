import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getGames } from "../utils/fetchGames";

interface Game {
  name: string;
  releaseDate: string;
  description: string;
  image: string;
  id: string;
}

const GenreCollection: React.FC = () => {
  const { genre } = useParams<{ genre?: string }>();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { games } = await getGames();
        const genreData = games.filter(
          (item: any) => item.genre.toLowerCase() === genre?.toLowerCase()
        );

        if (genreData) {
          setGames(genreData);
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    if (genre) {
      fetchData();
    } else {
      console.error("Genre is undefined");
    }
  }, [genre]);

  return (
    <>
      <h1
        style={{ color: "white", fontFamily: "Orbitron", textAlign: "center" }}
      >
        {genre}
      </h1>

      <MainGrid>
        {games.map((game, index) => (
          <GameBox key={index}>
            <Link
              to={`/game/${game.id}?genre=${genre}`}
              className="content"
            ></Link>
            <img src={game.image} alt={game.name} />
          </GameBox>
        ))}
      </MainGrid>
    </>
  );
};

export default GenreCollection;

const MainGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin: auto;
  margin-bottom: 50px;
  max-width: 950px;
  justify-content: center;
`;

const GameBox = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
  overflow: hidden;

  .content {
    position: absolute;

    width: 100%;
    height: 100%;
    background-color: #00000054;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
