import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function RecGameCard({
  name,
  image,
  description,
  id,
  rating,
}: any) {
  const detailHandler = (e: any) => {
    e.preventDefault();
    // redirect to detail page
    window.location.href = `/info/${id}`;
  };

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
    <MDBCard style={{ textAlign: "center" }}>
      <MDBCardImage
        src={image}
        alt="..."
        position="top"
        className="img-fluid"
        //style={{ width: '100%', height: '240px' }}
      />
      <MDBCardBody>
        <MDBCardTitle>{name}</MDBCardTitle>
        <MDBCardText>{description}</MDBCardText>
        <MDBTypography
          listUnStyled
          className="d-flex justify-content-center mb-3"
        >
          {renderStars(Math.floor(rating))}
        </MDBTypography>
        <MDBBtn tag={Link} onClick={detailHandler}>
          Detail
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
