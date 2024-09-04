import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { useParams } from "react-router-dom";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import RecGameCard from "../components/shared/RecGameCard";

export default function Search() {
  const { query } = useParams<{ query: string }>();

  const [games, setGames] = useState<any>([]);

  useEffect(() => {
    const fetchGamesAndRatings = async () => {
      try {
        const resGames = await fetch(
          `https://backend-production-6194.up.railway.app/api/games/search?name=${query}`
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
        setGames(gamesWithRatings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGamesAndRatings();
  }, []);

  return (
    <>
      <Header />

      <MDBRow className="row-cols-1 row-cols-md-4 g-4 mb-5">
        {!games.length ? (
          <div>
            <h1>No result</h1>
          </div>
        ) : (
          games.map((game: any) => {
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
          })
        )}
      </MDBRow>
      <Footer />
    </>
  );
}
