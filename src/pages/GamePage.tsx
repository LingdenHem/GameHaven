import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
interface Review {
  username: string;
  review: string;
}

interface Game {
  name: string;
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
  }, [reviews]);

  const genre = searchParams.get("genre");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/gamecollection.json");
        if (!response.ok) {
          console.error("Something went wrong!");
          return;
        }
        const data = await response.json();
        const genreData = data.collection.find(
          (item: any) => item.genre.toLowerCase() === genre?.toLowerCase()
        );
        if (genreData) {
          setGame(genreData.games.find((game: Game) => game.id === id));
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    if (id) {
      fetchData();
    } else {
      console.error("Genre is undefined");
    }
  }, []);

  const addReview = () => {
    const newReview = { username: inputValueUser, review: reviewValue };
    setReviews([...reviews, newReview]);
    setReviewValue("");
  };

  return (
    <div>
      <h1>{game?.name}</h1>
      <ReviewArea>
        <div className="input-area">
          <div className="name">
            Name
            <input
              type="text"
              placeholder="Enter your name"
              value={inputValueUser}
              onChange={(e) => setInputValueUser(e.target.value)}
            />
          </div>

          <div className="review">
            review
            <textarea
              placeholder="Enter your review"
              value={reviewValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addReview();
                }
              }}
              onChange={(e) => setReviewValue(e.target.value)}
            />
          </div>
        </div>

        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index}>
              <p>{review.username}</p>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </ReviewArea>
    </div>
  );
}

const ReviewArea = styled.div`
  margin: auto;
  width: 400px;
  .input-area {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;
