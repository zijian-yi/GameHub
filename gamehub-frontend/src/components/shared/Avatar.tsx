import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";

export default function Avatar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profileHandler = (e: any) => {
    e.preventDefault();
    window.location.href = `/users/${user.id}`;
  };
  const logoutHandler = (e: any) => {
    e.preventDefault();
    // console.log("hello")
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <MDBDropdown className="ms-4">
      <MDBDropdownToggle
        tag="a"
        className="hidden-arrow d-flex align-items-center nav-link"
      >
        <img
          src={
            user.avatar
              ? user.avatar
              : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
          }
          className="rounded-circle"
          height="40"
          alt="Avatar"
          loading="lazy"
        />
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link onClick={profileHandler}>
          MyProfile
        </MDBDropdownItem>
        <MDBDropdownItem link onClick={logoutHandler}>
          Logout
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}
