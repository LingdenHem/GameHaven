import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getGames } from "../utils/fetchGames";
import { Link } from "react-router-dom";

const SearchBar = styled.div`
  background-color: #f6f6f618;
  padding: 16px;
  display: flex;
  backdrop-filter: blur(10px);
  border: #ffffff3f 1px solid;
  border-radius: 3px;
  position: relative;
  z-index: 20;
  margin-top: 16px;

  input {
    background-color: #f6f6f618;
    text-align: center;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    border: #ffffff3f 1px solid;
    font-family: "Orbitron", sans-serif;
    color: white;
    backdrop-filter: blur(10px);
  }

  button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
    transition: all 0.12s ease-in;
    margin-left: 16px;
    filter: brightness(50%);

    &:hover {
      filter: brightness(100%);
    }
  }

  .dropdown {
    position: absolute;
    width: 100%;
    top: calc(100% + 16px);
    left: 0;
    background-color: #424242f4;
    backdrop-filter: blur(10px);
    border: #ffffff3f 1px solid;
    border-radius: 3px;
    z-index: 30;

    a {
      color: white;
      font-size: 16px;
      font-weight: 500;
      padding: 8px;
      display: block;
      text-decoration: none;

      &:hover {
        background-color: #ffffff1f;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 12px;
    margin-top: 12px;

    input {
      font-size: 16px;
      padding: 8px;
    }

    button {
      font-size: 20px;
      margin-left: 12px;
    }

    .dropdown a {
      font-size: 14px;
      padding: 6px;
    }
  }
`;

type Game = {
  id: number;
  name: string;
  image: string;
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchAllGames = async () => {
      const { games } = await getGames();

      setAllGames(games);
    };

    fetchAllGames();
  }, []);

  const handleSearch = () => {
    const filteredResults = allGames.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <SearchBar>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch();
        }}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && searchTerm.length !== 0 && (
        <div className="dropdown">
          {searchResults.map((result) => (
            <div key={result.id}>
              <Link to={`game/${result.id}`}>{result.name}</Link>{" "}
            </div>
          ))}
        </div>
      )}
    </SearchBar>
  );
};

export default SearchComponent;
