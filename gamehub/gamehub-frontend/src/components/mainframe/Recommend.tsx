import { useState, useEffect } from "react";

import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import RecGameCard from "../shared/RecGameCard";

export default function Recommend() {
  const [games, setGames] = useState<any>([]);
  const shuffle = (array: any) => {
    let shuffledArray = array.slice(); // Create a copy of the array to avoid direct mutation
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const fetchGamesAndRatings = async () => {
      try {
        const resGames = await fetch(
          "https://backend-production-6194.up.railway.app/api/games"
        );
        const dataGames = await resGames.json();

        const gamesWithRatingsPromises = dataGames.map(async (game: any) => {
          const resReviews = await fetch(
            `https://backend-production-6194.up.railway.app/api/reviews/game/${game.id}`
          );
          const reviews = await resReviews.json();
          const avgRating =
            reviews.reduce((acc: any, review: any) => acc + review.rating, 0) /
            reviews.length;
          return { ...game, avgRating: avgRating || 0 }; // Add default 0 rating in case there are no reviews
        });

        // Wait for all the reviews to be fetched and ratings to be calculated
        const gamesWithRatings = await Promise.all(gamesWithRatingsPromises);
        setGames(shuffle(gamesWithRatings));
      } catch (err) {
        console.log(err);
      }
    };

    fetchGamesAndRatings();
  }, []);

  return (
    // use the first 6 games for recommendation
    <MDBRow className="row-cols-1 row-cols-md-3 g-4 mb-5">
      {games.slice(0, 6).map((game: any) => {
        return (
          <MDBCol>
            <RecGameCard
              name={game.name}
              image={game.image}
              description={game.description}
              id={game.id}
              rating={game.avgRating}
            />
          </MDBCol>
        );
      })}
    </MDBRow>
  );
}
