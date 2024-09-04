import { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";
import Avatar from "./Avatar";
//import { useNavigate } from "react-router-dom";

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);
  const [query, setQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLogin = user.id ? true : false;
  //const navigate = useNavigate();

  const searchHandler = async (e: any) => {
    e.preventDefault();
    // redirect to search page
    window.location.href = `/search/${query}`;
    //navigate(`/search/${query}`);
  };

  return (
    <MDBNavbar
      className="mb-3"
      expand="lg"
      light
      style={{ backgroundColor: "#ededdd" }}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img src="../logo.svg" height="30" alt="" />
          GameHub
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/games">Games</MDBNavbarLink>
            </MDBNavbarItem>

            {/* disable for this stage */}
            {/* <MDBNavbarItem>
              <MDBNavbarLink href="#">Forum</MDBNavbarLink>
            </MDBNavbarItem> */}
          </MDBNavbarNav>

          <form className="d-flex input-group w-auto" onSubmit={searchHandler}>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            <MDBBtn color="primary" type="submit">
              <MDBIcon icon="search" fas />
            </MDBBtn>
          </form>

          <div className="d-flex align-items-center justify-content-center ">
            {isLogin ? (
              <Avatar />
            ) : (
              <MDBBtn
                outline
                color="success"
                className="ms-5 me-3"
                size="sm"
                type="button"
                href="/signin"
              >
                Login
              </MDBBtn>
            )}
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
