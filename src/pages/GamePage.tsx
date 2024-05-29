import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import { getGames } from "../utils/fetchGames";

interface Review {
  username: string;
  review: string;
}

interface Game {
  name: string;
  genre: string;
  releaseDate: string;
  description: string;
  image: string;
  id: string;
  reviews: Review[];
}

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<Game>();
  const [searchParams] = useSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [inputValueUser, setInputValueUser] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const storedReviews = localStorage.getItem(id as string);

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }

    setHasLoaded(true);
  }, [id]);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(id as string, JSON.stringify(reviews));
    }
  }, [reviews, hasLoaded, id]);

  const genre = searchParams.get("genre");
  useEffect(() => {
    const fetchData = async () => {
      const { games } = await getGames();

      setGame(games.find((game: Game) => game.id === id));
    };

    fetchData();
  }, [id, genre]);

  const addReview = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    const newReview = { username: inputValueUser, review: reviewValue };
    setReviews([...reviews, newReview]);
    setInputValueUser("");
    setReviewValue("");
  };

  const deleteReview = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favs.includes(game?.id)) {
      setIsFavorite(true);
    }
  }, [game]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favs.includes(game?.id)) {
      const updatedFavs = favs.filter((id: string) => id !== game?.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      setIsFavorite(false);
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favs, game?.id]));
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <GameDetailsContainer>
        <button className={isFavorite ? "added" : ""} onClick={toggleFavorite}>
          ❤️
        </button>
        <h1>{game?.name}</h1>
        <div className="image-container">
          <img src={game?.image} alt={game?.name} />
        </div>
        <div className="info">
          <p>Genre: {game?.genre}</p>
          <p>Release Date: {game?.releaseDate}</p>
        </div>
        <p>{game?.description}</p>
      </GameDetailsContainer>

      <ReviewArea>
        <form className="input-area" onSubmit={addReview}>
          <div className="name">
            Name
            <input
              type="text"
              placeholder="Enter your name"
              required={true}
              value={inputValueUser}
              onChange={(e) => setInputValueUser(e.target.value)}
            />
          </div>

          <div className="review">
            Review
            <textarea
              placeholder="Enter your review"
              value={reviewValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addReview(e as any);
                }
              }}
              onChange={(e) => setReviewValue(e.target.value)}
            />
          </div>
          <button>Submit Review</button>
        </form>

        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p>{review.username}</p>
              <p>{review.review}</p>
              <button onClick={() => deleteReview(index)}>Delete</button>
            </div>
          ))}
        </div>
      </ReviewArea>
    </div>
  );
}

const ReviewArea = styled.div`
  margin: 20px auto 150px auto;
  padding: 20px;
  width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f6f6f618;
  border: #ffffff3f 1px solid;

  color: white;

  backdrop-filter: blur(10px);

  textarea {
    resize: none !important;
  }

  .input-area {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .input-area .name,
  .input-area .review {
    margin-bottom: 15px;
    font-family: "Orbitron", sans-serif;
    font-weight: bold;
  }

  .input-area input,
  .input-area textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    background-color: #f6f6f61a;
    border: #ffffff3f 1px solid;
    color: white;
    border-radius: 4px;
    font-size: 16px;
  }

  .input-area textarea {
    resize: vertical;
    height: 100px;
  }

  .input-area button {
    align-self: flex-end;
    padding: 10px 20px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }

  .reviews-container {
    .review-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
      padding: 15px;

      background-color: #f6f6f61a;
      border: #ffffff3f 1px solid;

      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      p {
        margin: 0;
        font-size: 16px;
        color: white;

        &:first-of-type {
          font-weight: bold;
        }

        &:nth-of-type(2) {
          font-weight: 600;
          font-size: 14px;
        }
      }

      button {
        align-self: flex-end;
        background-color: #ff4d4d;
        border: none;
        color: black;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
        margin-top: 10px;

        &:hover {
          background-color: #cc0000;
        }
      }
    }
  }
`;

const GameDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f6f6f618;
  border: #ffffff3f 1px solid;

  color: white;

  backdrop-filter: blur(10px);
  position: relative;

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;

    filter: brightness(50%);

    &:hover {
      filter: brightness(100%);
    }
  }

  .added {
    filter: brightness(100%);
  }

  h1 {
    font-family: "Orbitron", sans-serif;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;

    border: #ffffff3f 1px solid;
    border-radius: 4px;
    padding: 4px 12px;

    color: #ffffffe7;

    margin-bottom: 16px;
  }

  p {
    margin: 3px;
    color: #ffffffd7;
  }

  .image-container {
    width: 400px;
    height: 400px;
    margin-bottom: 16px;

    img {
      border: #ffffff3f 1px solid;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
`;
