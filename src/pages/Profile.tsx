import { useState, useEffect } from "react";
import { getGames } from "../utils/fetchGames";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Game {
  id: number;
  name: string;
  image: string;
  genre: string;
}

const Profile = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [genreFilter, setGenreFilter] = useState<string>("");

  useEffect(() => {
    const fetchAllGames = async () => {
      const { games } = await getGames();
      setAllGames(games);
    };

    fetchAllGames();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (storedFavorites) {
      const filteredFavorites = allGames.filter((game) =>
        storedFavorites.includes(game.id)
      );
      setFavorites(filteredFavorites);
    }
  }, [allGames]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreFilter(event.target.value);
  };

  const filteredFavorites = favorites.filter((game) => {
    return genreFilter ? game.genre === genreFilter : true;
  });

  return (
    <>
      <ProfileHeading>
        <h2>Favorites</h2>
      </ProfileHeading>

      <FilterContainer>
        <label>
          Filter by genre
          <select value={genreFilter} onChange={handleGenreChange}>
            <option value="">All</option>
            <option value="MOBA">MOBA</option>
            <option value="Racing">Racing</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
          </select>
        </label>
      </FilterContainer>

      <Maindiv>
        {filteredFavorites.length ? (
          <GridContainer>
            {filteredFavorites.map((game, index) => (
              <GridItem key={index}>
                <ProfileItem>
                  <Link
                    to={`/game/${game.id}?genre=${game.genre}`}
                    className="content"
                  >
                    <img src={game.image} />
                  </Link>
                </ProfileItem>
              </GridItem>
            ))}
          </GridContainer>
        ) : (
          <p>No {genreFilter} games found.</p>
        )}
      </Maindiv>
    </>
  );
};

const Maindiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin: auto;
  margin-bottom: 50px;
  max-width: 950px;
  justify-content: center;
  color: white;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin: auto;
  margin-bottom: 50px;
  max-width: 950px;
  justify-content: center;
`;
const GridItem = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000054;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileItem = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;

  .content {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileHeading = styled.div`
  color: white;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  font-size: 48px;
  margin-top: -10px;
  @media (max-width: 640px) {
    font-size: 38px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-family: "Orbitron", sans-serif;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;

    select {
      margin-top: 5px;
      font-family: "Orbitron", sans-serif;
      padding: 10px;
      font-weight: 600;
    }
  }
`;

export default Profile;
