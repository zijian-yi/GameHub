import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import Add from "./Add";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<any>({});
  const [reviews, setReviews] = useState<any>([]);
  const [discussions, setDiscussions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resGame = await fetch(
          `https://backend-production-6194.up.railway.app/api/games/${id}`
        );
        const dataGame = await resGame.json();
        setGame(dataGame);

        const resReviews = await fetch(
          `https://backend-production-6194.up.railway.app/api/reviews/game/${id}`
        );
        const dataReviews = await resReviews.json();
        setReviews(dataReviews);

        const resDiscussions = await fetch(
          `https://backend-production-6194.up.railway.app/api/discussions/game/${id}`
        );
        const dataDiscussions = await resDiscussions.json();
        setDiscussions(dataDiscussions);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const avgRating =
    reviews.reduce((acc: any, review: any) => acc + review.rating, 0) /
    reviews.length;

  return (
    <div>
      <MDBCard style={{ borderRadius: "15px" }}>
        <MDBCardBody className="p-4">
          <div className="d-flex text-black">
            <div className="flex-shrink-0">
              <MDBCardImage
                style={{ width: "600px", borderRadius: "15px" }}
                src={game.image}
                alt="Generic placeholder image"
                fluid
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <MDBCardTitle>{game.name}</MDBCardTitle>
              <MDBCardText>{game.developer}</MDBCardText>
              <p className="text-muted mb-2">Platform: {game.platform}</p>
              <p className="text-muted mb-2">Genre: {game.genre}</p>
              <p className="text-muted mb-2">
                Release Date: {game.releaseDate}
              </p>
              <div
                className="d-flex justify-content-center rounded-3 p-2 mb-2"
                style={{ backgroundColor: "#efefef" }}
              >
                <div>
                  <p className="small text-muted mb-1">Discussions</p>
                  <p className="mb-0">{discussions.length}</p>
                </div>
                <div className="px-3">
                  <p className="small text-muted mb-1">Reviews</p>
                  <p className="mb-0">{reviews.length}</p>
                </div>
                <div>
                  <p className="small text-muted mb-1">Rating</p>
                  <p className="mb-0">{Number(avgRating.toFixed(2))}</p>
                </div>
              </div>
              <div>
                <Add />
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default Profile;
