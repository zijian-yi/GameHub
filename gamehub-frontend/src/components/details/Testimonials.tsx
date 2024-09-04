import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Testimonials() {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<any>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reponse = await fetch(
          `https://backend-production-6194.up.railway.app/api/reviews/game/${id}`
        );
        if (!reponse.ok) {
          throw new Error("Fetch reviews failed!");
        }
        const reviews = await reponse.json();
        if (!reviews) {
          throw new Error("Fetch reviews failed!");
        }
        console.log(reviews);

        const reviewsWithUser = await Promise.all(
          reviews.map(async (review: any) => {
            const userReponse = await fetch(
              `https://backend-production-6194.up.railway.app/api/users/${review.userId}`
            );
            if (!userReponse.ok) {
              throw new Error("Fetch user failed!");
            }
            const user = await userReponse.json();
            if (!user) {
              throw new Error("Fetch user failed!");
            }
            return { ...review, user };
          })
        );
        console.log(reviewsWithUser);
        setReviews(reviewsWithUser);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, [id]);

  function renderStars(rating: number) {
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_) => (
          <MDBIcon fas icon="star" size="sm" className="text-warning" />
        ))}
        {halfStars > 0 && (
          <MDBIcon
            fas
            icon="star-half-alt"
            size="sm"
            className="text-warning"
          />
        )}
        {[...Array(emptyStars)].map((_) => (
          <MDBIcon far icon="star" size="sm" className="text-warning" />
        ))}
      </>
    );
  }

  return (
    <div>
      <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="10" xl="8" className="text-center">
            <h3 className="mb-4">Latest Critic Reviews</h3>
          </MDBCol>
        </MDBRow>
        <MDBRow className="text-center">
          {reviews.map((review: any) => {
            return (
              <MDBCol md="4" className="mb-5 mb-md-0">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src={
                      review.user.avatar
                        ? review.user.avatar
                        : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                    }
                    className="rounded-circle shadow-1-strong"
                    width="100"
                    height="100"
                  />
                </div>
                <h5 className="mb-3">{review.user.username}</h5>
                <h6 className="text-primary mb-3">{review.postedDate}</h6>
                <p className="px-xl-3">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  {review.comment}
                </p>
                <MDBTypography
                  listUnStyled
                  className="d-flex justify-content-center mb-5"
                >
                  {renderStars(review.rating)}
                </MDBTypography>
              </MDBCol>
            );
          })}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
