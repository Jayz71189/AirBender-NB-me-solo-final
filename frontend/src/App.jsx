import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage/LandingPage";
import SpotDetail from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/SpotUpdate";
import ReviewModal from "./components/ReviewModal";
// import Header from "./components/Header/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TestModal from "./components/test";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetail />,
      },
      {
        path: "/spots/new",
        element: <CreateSpot />,
      },
      {
        path: "/spots/:spotId/edit",
        element: <UpdateSpot />,
      },
      {
        path: "/review/:reviewId",
        element: <h1>Reviews!</h1>,
      },
      { path: "/spots/manage", element: <ManageSpots /> },
      {
        path: "/review/",
        element: <ReviewModal />,
      },
      {
        path: "/test/",
        element: <TestModal />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
