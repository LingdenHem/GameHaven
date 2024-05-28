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

interface GenreCollectionData {
  genre: string;
  games: Game[];
}

const GenreCollection: React.FC = () => {
  const { genre } = useParams<{ genre?: string }>();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGames();
        const genreData = data.collection.find(
          (item: any) => item.genre.toLowerCase() === genre?.toLowerCase()
        );
        if (genreData) {
          setGames(genreData.games);
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
    <div>
      <h1>{genre} Games</h1>
      <MainGrid>
        {games.map((game, index) => (
          <GameBox key={index}>
            <Link to={`/game/${game.id}?genre=${genre}`} className="content">
              <h2>{game.name}</h2>
            </Link>
            <img src={game.image} alt={game.name} />
          </GameBox>
        ))}
      </MainGrid>
    </div>
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
    inset: 0;

    background-color: #00000054;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
