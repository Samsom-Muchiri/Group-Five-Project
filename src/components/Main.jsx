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
import Checkout from "./Checkout";
import Payment from "./Payment";
import FillDetail from "./FillDetail";
import ItemDetail from "./ItemDetail";

function Main() {
  const vl = useContext(Appcontext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Nav />}>
        <Route index element={<LandingPage />} />
        <Route path="desc" element={<ItemDescription />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signin" element={<Signin />} />
        <Route path={":detail"} element={<ItemDetail />} />
        <Route path="checkout" element={<Checkout />}>
          <Route index element={<FillDetail />} />
          <Route path="pay" element={<Payment />} />
        </Route>
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
