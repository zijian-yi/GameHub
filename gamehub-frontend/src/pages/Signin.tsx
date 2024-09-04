import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Signin() {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const navigate = useNavigate();

  const handleJustifyClick = (value: any) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log(email, password);
      const response = await fetch(
        "https://backend-production-6194.up.railway.app/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const user = await response.json();
      if (!user) {
        throw new Error("Login failed!");
      }
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterSubmit = async (event: any) => {
    event.preventDefault();

    if (!email || !password || !username) {
      alert("Please fill in all fields.");
      return;
    }

    // add user to database
    const reponse = await fetch(
      "https://backend-production-6194.up.railway.app/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      }
    );

    if (!reponse.ok) {
      throw new Error("Register failed!");
    }

    const user = await reponse.json();
    if (!user) {
      throw new Error("Register failed!");
    }
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div>
      <Header />
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <form onSubmit={handleLoginSubmit}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div> */}

              <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
              {/* <p className="text-center">Not a member? <a href="#!">Register</a></p> */}
            </form>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <form onSubmit={handleRegisterSubmit}>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="form1"
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  id="flexCheckDefault"
                  label="I have read and agree to the terms"
                />
              </div>

              <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default Signin;
