import React, { useContext, useRef, useState } from "react";
import "../style sheets/checkout.css";
import Paypal from "./paypal";
import { Appcontext } from "../context/Contexts";

function Payment() {
  const [userData, setUserData] = useState({});
  const [payWith, setPayWith] = useState("");
  const vl = useContext(Appcontext);
  useState(() => {
    if (localStorage.getItem("Detail_Data") !== null) {
      const userPayDetail = JSON.parse(localStorage.getItem("Detail_Data"));
      setUserData(userPayDetail);
    }
  }, []);
  function setChackecked(e) {
    setPayWith(e.target.placeholder);
  }
  function handleSubmit(e) {
    e.preventDefault();
    vl.openPay(payWith);
  }
  const {
    total_Price,
    First_Name,
    Last_Name,
    Email,
    Street,
    /* 'Apartment/suite/unit etc.. */
    Address,
    City,
    items_length,
    Leave_a_note_for_us,
    Phone_Number,
  } = userData;
  const currencyFormaterKsh = new Intl.NumberFormat("en-US", {
    formar: "currency",
    currency: "USD",
  });
  const currencyPrice = currencyFormaterKsh.format(total_Price);
  return (
    <>
      <div className="Pay-container">
        <div className="pay-details-container">
          <div className="user-checkout-details">
            <h2>Final step</h2>
            <br />
            <h3>Your cart details </h3>
            <hr />
            <p>
              <i>Toral price:</i> Ksh {currencyPrice}
            </p>
            <p>
              <i>Total items:</i> {items_length}
            </p>
            <h3>Your contact info</h3>
            <hr />
            <p>
              <i>Phone number:</i> {Phone_Number}
            </p>
            <p>
              <i>Email:</i> {Email}
            </p>
            <h3>Delivery details</h3>
            <hr />
            <p>
              <i>Street</i> {Street}
            </p>
            <p>
              <i>Apartment/suite/unite etc... :</i> {userData[0]}
            </p>
            <p>
              <i>Address:</i> {Address}
            </p>
            <p>
              <i>City:</i> {City}
            </p>
          </div>
        </div>
        <div className="payment-method-container">
          <h3>Choose payment method</h3>
          <form onSubmit={handleSubmit}>
            <div className="pay-type">
              {" "}
              <input
                type="radio"
                name="pay-with"
                onChange={setChackecked}
                placeholder="payPal"
                required
              />
              <img src="https://1000logos.net/wp-content/uploads/2021/04/Paypal-logo.png" />
            </div>

            <div className="pay-type">
              {" "}
              <input
                type="radio"
                name="pay-with"
                onChange={setChackecked}
                placeholder="mpesa"
                required
              />
              <img src="	https://www.safaricom.co.ke/images/MicrosoftTeams-image.jpg" />
            </div>
            <button>Pay</button>
          </form>
        </div>{" "}
      </div>{" "}
      <button className="prev-btn">Previous</button>
      <Paypal data={userData} />
    </>
  );
}

export default Payment;
