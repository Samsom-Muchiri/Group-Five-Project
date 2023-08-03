import React, { useContext } from "react";
import "../style sheets/finishpay.css";
import { Outlet } from "react-router-dom";

function Checkout() {
  return (
    <div className="container">
      <h1>Thank You for shoping with us</h1>
      <br />
      <br />
      <div className="progress-track">
        <div className="progress">
          <div className="add-to-cart prs">
            <span>Add to cart</span>
            <i className="fa fa-check" aria-hidden="true"></i>
          </div>
          <div className="fill-detais prs">
            <span>Fill in your details</span>
            <i className={"fa fa-check"} aria-hidden="true"></i>
          </div>
          <div className="make-payment prs">
            <span>Make payment</span>
            <i className="" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Checkout;
