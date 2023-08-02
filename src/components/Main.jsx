import React, { useContext } from "react";
import { Appcontext } from "../context/Contexts";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Nav from "./Nav";

/* Pages... */
import LandingPage from "./LandingPage";
import ItemDescription from "./ItemDescription";
import LoginPage from "./LoginPage";
import Signin from "./Signin";

function Main() {
  const vl = useContext(Appcontext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Nav />}>
        <Route index element={<LandingPage />} />
        <Route path="desc" element={<ItemDescription />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Main;
