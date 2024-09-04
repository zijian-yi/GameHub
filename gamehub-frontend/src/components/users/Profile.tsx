import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import ReviewGameCard from "../shared/ReviewGameCard";
import { useEffect, useState } from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [reviews, setReviews] = useState<any>([]);
  const [games, setGames] = useState<any>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const showAllHandler = (e: any) => {
    e.preventDefault();
    setShowAll(!showAll);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReviews = await fetch(
          `https://backend-production-6194.up.railway.app/api/reviews/user/${user.id}`
        );
        const dataReviews = await resReviews.json();
        const resGames = await fetch(
          `https://backend-production-6194.up.railway.app/api/games`
        );
        const dataGames = await resGames.json();
        setGames(dataGames);
        // sort reviews by date in descending order
        dataReviews.sort((a: any, b: any) => {
          return (
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
        });
        setReviews(dataReviews);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#e3f2fd" }}>
      <MDBContainer className="py-5 h-100 mb-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" xl="9">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={
                      user.avatar
                        ? user.avatar
                        : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                    }
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />

                  {/* disabled edit profile button for now */}
                  {/* <MDBBtn
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Edit profile
                  </MDBBtn> */}
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">{user.username}</MDBTypography>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">
                      {reviews.length}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Reviews
                    </MDBCardText>
                  </div>

                  {/* disabled followers and following for now */}
                  {/* <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Followers
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Following
                    </MDBCardText>
                  </div> */}
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-0">
                      I am the boss of GameHub
                    </MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    Recent reviews
                  </MDBCardText>
                  <MDBCardText className="mb-0">
                    <a href="" className="text-muted" onClick={showAllHandler}>
                      {showAll ? "Show recent" : "Show all"}
                    </a>
                  </MDBCardText>
                </div>
                <MDBContainer fluid className="my-5">
                  <MDBRow className="h-100">
                    {showAll
                      ? reviews.map((review: any) => {
                          return (
                            <MDBCol md="6" lg="4" className="mb-4 mb-lg-0">
                              <ReviewGameCard
                                name={
                                  games.find(
                                    (game: any) => game.id === review.gameId
                                  ).name
                                }
                                img={
                                  games.find(
                                    (game: any) => game.id === review.gameId
                                  ).image
                                }
                                rating={review.rating}
                                comment={review.comment}
                              />
                            </MDBCol>
                          );
                        })
                      : reviews.slice(0, 3).map((review: any) => {
                          return (
                            <MDBCol md="6" lg="4" className="mb-4 mb-lg-0">
                              <ReviewGameCard
                                name={
                                  games.find(
                                    (game: any) => game.id === review.gameId
                                  ).name
                                }
                                img={
                                  games.find(
                                    (game: any) => game.id === review.gameId
                                  ).image
                                }
                                rating={review.rating}
                                comment={review.comment}
                              />
                            </MDBCol>
                          );
                        })}
                  </MDBRow>
                </MDBContainer>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
