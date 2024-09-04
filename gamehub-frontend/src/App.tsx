import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Info from "./pages/Info";
import UserProfile from "./pages/UserProfile";
import Games from "./pages/Games";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/info/:id",
    element: <Info />,
  },
  {
    path: "/search/:query",
    element: <Search />,
  },
  {
    path: "/users/:id",
    element: <UserProfile />,
  },
  {
    path: "games",
    element: <Games />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
