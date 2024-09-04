import { MDBTypography } from "mdb-react-ui-kit";
import Spotlight from "./Spotlight";
import Recommend from "./Recommend";

export default function Body() {
  return (
    <>
      <MDBTypography tag="h1" className="text-center">
        Unlock your next captivating gaming moment
      </MDBTypography>
      <div className="mb-3 my-3">
        <MDBTypography
          variant="h2"
          className="text-start"
          style={{ color: "#7db2db" }}
        >
          Weekly Spotlight
        </MDBTypography>
        <Spotlight />
      </div>

      <div className="mb-3">
        <MDBTypography
          variant="h2"
          className="text-start"
          style={{ color: "#d16e6d" }}
        >
          Recommendation
        </MDBTypography>
        <Recommend />
      </div>

      {/* disabled for the stage */}
      {/* <div className="mb-3">
        <MDBTypography
          variant="h2"
          className="text-start"
          style={{ color: "#207528" }}
        >
          New Discussion
        </MDBTypography>
        <News />
      </div> */}
    </>
  );
}
