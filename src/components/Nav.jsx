import React, { useContext, useEffect } from "react";
import "../style sheets/nav.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { Appcontext } from "../context/Contexts";

function Nav() {
  const vl = useContext(Appcontext);
  const navigate = useNavigate();
  useEffect(() => {
    function changeLocation() {
      navigate("/");
    }
  }, [vl.userIsLoged]);
  const q = vl.cartStatus;
  function openCart() {
    vl.toggleCart(q);
  }
  return (
    <>
      <nav>
        <div className="logo-header">
          <h1>Green Space</h1>
          <p>Get the best from Green Space</p>
          <div className="log-btn">
            <i className="fa fa-user" aria-hidden="true"></i>
            {vl.userIsLoged === null ? (
              <>
                <Link to="login">login</Link> / <Link to="signin">sign in</Link>
              </>
            ) : (
              vl.userIsLoged // Display user's name or other content when logged in
            )}
          </div>
        </div>
        <form>
          <label className="search" htmlFor="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input type="search"></input>
          <button id="submit"></button>
        </form>
        <div className="options">
          <ul>
            <li>options</li>
            <li>
              options<i className="fa fa-angle-down" aria-hidden="true"></i>
              <div className="sub-menu">
                <ul>
                  <li>option</li>
                </ul>
              </div>
            </li>
            <li>options</li>
            <li>options</li>
            <li>options</li>
            <li>options</li>
            <li>
              {" "}
              <div className="log-btn mobile-log">
                <i className="fa fa-user" aria-hidden="true"></i>
                login/sign in
              </div>
            </li>
          </ul>
        </div>
        <div className="cart-icon" datacount={0} onClick={openCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-basket"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 10l5 -6l5 6" />
            <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z" />
            <path d="M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          </svg>
        </div>
      </nav>
      <CartItem cartSlide={"fs"} />
      <Outlet />
    </>
  );
}

export default Nav;
