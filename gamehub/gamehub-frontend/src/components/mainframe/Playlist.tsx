import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Playlist() {
  const [games, setGames] = useState<any>([]);

  useEffect(() => {
    fetch("https://backend-production-6194.up.railway.app/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    // use the first 3 games from the database
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      {games.map((game: any) => {
        return (
          <MDBCol>
            <MDBCard>
              <MDBCardImage
                src={game.image}
                alt="..."
                position="top"
                style={{ width: "100%", height: "240px" }}
              />
              <MDBCardBody>
                <MDBCardTitle>{game.name}</MDBCardTitle>
                <MDBCardText>{game.description}</MDBCardText>
                <MDBBtn tag={Link} to={`/info/${game.id}`}>
                  Detail
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        );
      })}
    </MDBRow>
  );
}
