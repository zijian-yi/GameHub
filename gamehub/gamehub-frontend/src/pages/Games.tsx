import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { useState, useEffect } from "react";

import {
  MDBRow,
  MDBCol,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import RecGameCard from "../components/shared/RecGameCard";

export default function Games() {
  const [games, setGames] = useState<any>([]);
  const [originalGames, setOriginalGames] = useState<any>([]);

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
        setGames(gamesWithRatings);
        setOriginalGames(gamesWithRatings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGamesAndRatings();
  }, []);

  const sortByRating = () => {
    setGames(
      [...originalGames].sort((a: any, b: any) => b.avgRating - a.avgRating)
    );
  };

  const sortByName = () => {
    setGames(
      [...originalGames].sort((a: any, b: any) => a.name.localeCompare(b.name))
    );
  };

  const sortByDate = () => {
    setGames(
      [...originalGames].sort((a: any, b: any) =>
        b.releaseDate.localeCompare(a.releaseDate)
      )
    );
  };

  const filterByPs5 = () => {
    setGames(
      [...originalGames].filter(
        (game: any) =>
          game.platform.includes("PlayStation 5") ||
          game.platform.includes("Playstation 5")
      )
    );
  };

  const filterByXbox = () => {
    setGames(
      [...originalGames].filter(
        (game: any) =>
          game.platform.includes("Xbox") || game.platform.includes("XBOX")
      )
    );
  };

  const filterBySwitch = () => {
    setGames(
      [...originalGames].filter((game: any) => game.platform.includes("Switch"))
    );
  };

  const filterByWindows = () => {
    setGames(
      [...originalGames].filter((game: any) =>
        game.platform.includes("Windows")
      )
    );
  };

  const filterByAction = () => {
    setGames(
      [...originalGames].filter(
        (game: any) =>
          game.genre.includes("Action") || game.genre.includes("action")
      )
    );
  };

  const filterByAdventure = () => {
    setGames(
      [...originalGames].filter(
        (game: any) =>
          game.genre.includes("Adventure") || game.genre.includes("adventure")
      )
    );
  };

  const filterByFPS = () => {
    setGames(
      [...originalGames].filter(
        (game: any) => game.genre.includes("FPS") || game.genre.includes("fps")
      )
    );
  };

  const filterBySports = () => {
    setGames(
      [...originalGames].filter(
        (game: any) =>
          game.genre.includes("Sports") ||
          game.genre.includes("sports") ||
          game.genre.includes("Sport") ||
          game.genre.includes("sport")
      )
    );
  };

  return (
    <>
      <Header />
      <MDBBtnGroup className="mb-3">
        <MDBBtnGroup>
          <MDBDropdown>
            <MDBDropdownToggle outline>Sort by</MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={sortByRating}>
                Rating
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={sortByName}>
                Name
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={sortByDate}>
                Release Date
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBBtnGroup>

        <MDBBtnGroup>
          <MDBDropdown>
            <MDBDropdownToggle outline>Filter by Platform</MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={filterByPs5}>
                PS5
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={filterByXbox}>
                XBox
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={filterBySwitch}>
                Switch
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={filterByWindows}>
                Windows
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBBtnGroup>

        <MDBBtnGroup>
          <MDBDropdown>
            <MDBDropdownToggle outline>Filter by Genre</MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={filterByAction}>
                Action
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={filterByAdventure}>
                Adventure
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={filterByFPS}>
                FPS
              </MDBDropdownItem>
              <MDBDropdownItem link onClick={filterBySports}>
                Sports
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBBtnGroup>
      </MDBBtnGroup>
      <MDBRow className="row-cols-1 row-cols-md-4 g-4 mb-5">
        {games.map((game: any) => {
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
      <Footer />
    </>
  );
}
