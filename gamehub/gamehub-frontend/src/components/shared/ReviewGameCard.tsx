import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function ReviewGameCard({ name, img, rating, comment }: any) {
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <MDBCard className="mb-3">
      <MDBCardBody className="py-4 mt-2" style={{textAlign: "center"}}>
        <div className="d-flex justify-content-center mb-4">
          <img
            src={img}
            className="shadow-1-strong img-fluid"
            
          />
        </div>
        <h5 className="font-weight-bold">{name}</h5>
        <MDBTypography listUnStyled className="d-flex justify-content-center">
          {[...Array(fullStars)].map((_, index) => (
            <li key={index}>
              <MDBIcon fas icon="star" size="sm" color="info" />
            </li>
          ))}
          {hasHalfStar && (
            <li>
              <MDBIcon fas icon="star-half-alt" size="sm" color="info" />
            </li>
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <li key={index}>
              <MDBIcon fas icon="star" size="sm" color="secondary" />
            </li>
          ))}
        </MDBTypography>
        <p className="mb-2">
          <MDBIcon fas icon="quote-left" className="pe-2" />
          {comment}
        </p>
      </MDBCardBody>
    </MDBCard>
  );
}
