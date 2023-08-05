import React, { useContext, useEffect, useState } from "react";
import "../style sheets/nav.css";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { Appcontext } from "../context/Contexts";

function Nav() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [userIsUpdated, setUserIsUpdated] = useState(null);
  const [userHasLogedOut, setUserHasLogedOut] = useState(null);
  const vl = useContext(Appcontext);
  const [searchItems, setSearchItems] = useState([]);
  const itemCount = vl.addedItems.length;

  useEffect(() => {
    if (vl.userIsLoged !== null) {
      setUserHasLogedOut(vl.userIsLoged);
    }
  }, [vl.userIsLoged]);
  function handleSearch(e) {
    const value = e.target.value;
    setSearchState(value);
  }
  useEffect(() => {
    setSearchItems(vl.items);
  }, [vl.items]);
  const q = vl.cartStatus;
  function openCart() {
    vl.toggleCart(q);
  }

  const searchedResults = searchItems.filter((obj) => {
    const name = obj.product_name;
    return name.toLowerCase().includes(searchState.toLowerCase());
  });
  const searchedResultsJSX = searchedResults.map((obj, index) => (
    <Link to={obj.product_name} key={index} className="result-p">
      <p key={index}>{obj.product_name}</p>
    </Link>
  ));

  function handleMObileMenu(e) {
    e.stopPropagation();
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
  function handlelogOut() {
    localStorage.removeItem("user");
    setUserHasLogedOut(null);
  }
  return (
    <>
      <nav>
        <div className="logo-header">
          <h1>Green Space</h1>
          <p>Get the best from Green Space</p>
          <div className="log-btn">
            <i className="fa fa-user" aria-hidden="true"></i>
            {userHasLogedOut === null ? (
              <>
                <Link to="login">login</Link> / <Link to="signin">sign in</Link>
              </>
            ) : (
              userHasLogedOut

              // Display user's name or other content when logged in
            )}
            <p onClick={handlelogOut} style={{ cursor: "pointer" }}>
              {userHasLogedOut !== null ? "log out" : ""}
            </p>
          </div>
        </div>
        <form style={searchIsOpen ? { display: "flex" } : { display: "none" }}>
          <label className="search" htmlFor="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            style={
              searchIsOpen
                ? { boxShadow: "0px 0px 0px 3000px rgba(0, 0, 0, 0.683)" }
                : {}
            }
            onChange={handleSearch}
          />
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={closeSearch}
          ></i>
          <button id="submit"></button>
          <div className="searchDiv">
            {searchState !== "" ? searchedResultsJSX : ""}
          </div>
        </form>
        <form className="dsk-search">
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
            onChange={handleSearch}
          />

          <button id="submit"></button>
          <div className="searchDiv">
            {searchState !== "" ? searchedResultsJSX : ""}
          </div>
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
                {vl.userIsLoged !== null ? "log out" : ""}
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
      <div className="footer">
        <div className="list-container">
          {" "}
          <div className="footer-title">
            <h1>Green Space</h1>
          </div>
          <div className="link-list links">
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <a>
                <li>About Us</li>
              </a>
              <a>
                <li>Contact Us</li>
              </a>
              <a>
                <li>Blog</li>
              </a>
            </ul>
          </div>
          <div className="link-list-2 links">
            <ul>
              <a>
                <li>Terms and Conditions</li>
              </a>
              <a>
                <li>Disclaimer</li>
              </a>
              <a>
                <li>Privacy policy</li>
              </a>
              <a>
                <li>FAQs</li>
              </a>
            </ul>
          </div>
          <div className="link-list-3 links">
            <ul>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-whatsapp"
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
                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-instagram"
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
                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M16.5 7.5l0 .01" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-facebook-filled"
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
                    <path
                      d="M18 2a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -.883 .993l-.117 .007h-3v1h3a1 1 0 0 1 .991 1.131l-.02 .112l-1 4a1 1 0 0 1 -.858 .75l-.113 .007h-2v6a1 1 0 0 1 -.883 .993l-.117 .007h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-6h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-4a1 1 0 0 1 .883 -.993l.117 -.007h2v-1a6 6 0 0 1 5.775 -5.996l.225 -.004h3z"
                      strokeWidth="0"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-twitter"
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
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-copyright"
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
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M14 9.75a3.016 3.016 0 0 0 -4.163 .173a2.993 2.993 0 0 0 0 4.154a3.016 3.016 0 0 0 4.163 .173" />
        </svg>
        2023 All Rights Reserved
      </div>
    </>
  );
}

export default Nav;
