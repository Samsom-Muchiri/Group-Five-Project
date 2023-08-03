import React, { useContext, useEffect, useState } from "react";
import "../style sheets/nav.css";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { Appcontext } from "../context/Contexts";

function Nav() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const vl = useContext(Appcontext);
  const itemCount = vl.addedItems.length;
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [vl.userIsLoged]);
  const q = vl.cartStatus;
  function openCart() {
    vl.toggleCart(q);
  }
  function handleMObileMenu(e) {
    e.stopPropagation();
    console.log("cliked");
    setMenuIsOpen(false);
  }
  function handleCloseMenu(e) {
    const target = e.target;
    const li = target.closest("li");
    const ul = target.closest("ul");
    if (window.innerWidth < 624) {
      if (menuIsOpen) {
        if (li === null || ul === null) {
          setMenuIsOpen(true);
        }
      }
    } else {
      setMenuIsOpen(false);
    }
  }
  window.addEventListener("click", handleCloseMenu);
  function openSearch() {
    setSearchIsOpen(true);
  }
  function closeSearch() {
    setSearchIsOpen(false);
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
        <form style={searchIsOpen ? { display: "flex" } : { display: "none" }}>
          <label className="search" htmlFor="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            type="search"
            style={
              searchIsOpen
                ? { boxShadow: "0px 0px 0px 3000px rgba(0, 0, 0, 0.683)" }
                : {}
            }
          ></input>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={closeSearch}
          ></i>
          <button id="submit"></button>
        </form>
        <div
          className="options"
          style={
            menuIsOpen
              ? { transform: "translate(-100%)" }
              : { transform: "translate(0%)" }
          }
        >
          <ul>
            <li>
              <NavLink to="/">home</NavLink>{" "}
            </li>

            <li>options</li>
            <li>options</li>
            <li>options</li>
            <li>options</li>
            <li>
              {" "}
              <div className="log-btn mobile-log">
                <i className="fa fa-user" aria-hidden="true"></i>
                {vl.userIsLoged === null ? (
                  <>
                    <Link to="login">login</Link> /{" "}
                    <Link to="signin">sign in</Link>
                  </>
                ) : (
                  vl.userIsLoged // Display user's name or other content when logged in
                )}
              </div>
            </li>
          </ul>
        </div>
        <div
          className="cart-icon cart-desck"
          datacount={itemCount}
          onClick={openCart}
        >
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

        <div
          className="cart-icon cart-mobile"
          datacount={itemCount}
          onClick={openCart}
        >
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
        <div className="mobile-menu" onClick={handleMObileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-align-left"
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
            <path d="M4 6l16 0" />
            <path d="M4 12l10 0" />
            <path d="M4 18l14 0" />
          </svg>
        </div>
        <div className="mobile-search">
          <i
            className="fa fa-search "
            aria-hidden="true"
            onClick={openSearch}
          ></i>
        </div>
      </nav>
      <CartItem cartSlide={"fs"} />
      <Outlet />
    </>
  );
}

export default Nav;
