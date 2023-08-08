import { useContext, useState } from "react";
import React from "react";
import { Appcontext } from "../context/Contexts";

function Paypal({ data }) {
  const [payCardIsOpen, setPayCardIsOpen] = useState(false);
  const vl = useContext(Appcontext);
  function openPayCard() {
    vl.openPay();
  }
  function closePayCard() {
    vl.closePay();
  }
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const mpesaForm = (
    <>
      <div className="header">
        <img
          src="	https://sapamacash.com/img/lipa_na_mpesa.png"
          alt="PayPal Logo"
        />
        <h4>{`${day} / ${month} / ${year}`}</h4>
      </div>
      <form className="payment-form">
        <input type="text" placeholder="Mobile" />
        <button className="paypal-pay-btn">Pay Now</button>
      </form>
    </>
  );
  const payPalForm = (
    <>
      <div className="header">
        <img
          src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"
          alt="PayPal Logo"
        />
        <h4>{`${day} / ${month} / ${year}`}</h4>
      </div>
      <form className="payment-form paypal-form">
        <input type="text" placeholder="Card number" />
        <div className="dbl-input">
          {" "}
          <input type="text" placeholder="Express" />
          <input type="text" placeholder="CSC" />
        </div>
        <div className="dbl-input">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="text" placeholder="Zip code" />
        <input type="text" placeholder="Mobile" />
        <button className="paypal-pay-btn">Pay Now</button>
      </form>
    </>
  );

  console.log(data);
  const currencyFormaterKsh = new Intl.NumberFormat("en-KE", {
    format: "currency",
    currency: "KES",
  });
  const currencyPrice = currencyFormaterKsh.format(data.total_Price);
  return (
    <div
      className="pay-wrapper"
      style={
        vl.payCardState !== false ? { display: "block" } : { display: "none" }
      }
    >
      <div className="pay-container">
        <div className="container-pay">
          <i
            className="fa fa-times-circle"
            aria-hidden="true"
            onClick={closePayCard}
          ></i>
          <div className="left">
            <div className="info-box">
              <div className="entry">
                <i className="icon-wallet" aria-hidden="true"></i>
                <p>
                  Amount:
                  <br />
                  <span>Ksh {currencyPrice}</span>
                </p>
              </div>
              <div className="entry">
                <i className="icon-calendar" aria-hidden="true"></i>
                <p>
                  Date:
                  <br />
                  <span>{`${day} / ${month} / ${year}`}</span>
                </p>
              </div>
              <div className="entry">
                <i className="icon-star" aria-hidden="true"></i>
                <p>
                  Issuer:
                  <br />
                  <span>Dribbble</span>
                </p>
              </div>
              <div className="entry">
                <i className="icon-notebook" aria-hidden="true"></i>
                <p>
                  Confirmation Nr:
                  <br />
                  <span>0YX123580219G</span>
                </p>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="content">
              {vl.payCardState === "mpesa" ? mpesaForm : payPalForm}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paypal;
