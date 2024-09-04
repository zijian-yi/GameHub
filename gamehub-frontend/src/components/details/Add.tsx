import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBInput,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Add() {
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [comment, setComment] = useState<any>("");
  const [rate, setRate] = useState<number>(-1);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!user.id) {
      alert("Please login to comment.");
      return;
    }
    if (!id) {
      alert("Missing game info.");
      return;
    }

    if (!comment || !comment.trim() || rate < 0 || rate > 10) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log(id, user.id, comment, rate);
      const reponse = await fetch(
        `https://backend-production-6194.up.railway.app/api/reviews/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: id,
            userId: user.id,
            comment: comment,
            rating: rate,
            postedDate: new Date(),
          }),
        }
      );
      if (!reponse.ok) {
        throw new Error("Comment failed!");
      }
      const review = await reponse.json();
      if (!review) {
        throw new Error("Comment failed!");
      }
      // reload page
      window.location.reload();
      console.log(review);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBCard>
      <MDBCardBody className="p-4">
        <div className="d-flex flex-start w-100">
          <MDBCardImage
            className="rounded-circle shadow-1-strong me-3"
            src={user.avatar ? user.avatar : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"}
            alt="avatar"
            width="65"
            height="65"
          />

          <div className="w-100">
            <MDBTypography tag="h5">Add a comment</MDBTypography>
            <form onSubmit={handleSubmit}>
              <MDBInput
                className="Numberinput mb-3"
                label="Rating (0 - 10)"
                id="typeNumber"
                type="number"
                onChange={(e: any) => setRate(+e.target.value)}
              />
              <MDBTextArea
                className="form-control mb-3"
                label="What is your view?"
                rows={4}
                onChange={(e: any) => setComment(e.target.value)}
              />

              <MDBBtn color="success">
                Send <MDBIcon fas icon="long-arrow-alt-right ms-1" />
              </MDBBtn>
            </form>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
