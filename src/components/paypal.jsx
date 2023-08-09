import { useContext, useState } from "react";
import React from "react";
import { Appcontext } from "../context/Contexts";
import Loader from "./Loader";

function Paypal({ data }) {
  const [mpesaMobile, setMpesaMobile] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [mpesaPayError, setPayError] = useState(false);
  const vl = useContext(Appcontext);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  function openPayCard() {
    vl.openPay();
  }
  function closePayCard() {
    vl.closePay();
  }
  function setPhone(e) {
    setMpesaMobile(e.target.value);
  }

  function callMpesa(e) {
    e.preventDefault();
    const arrayMobile = [...mpesaMobile];
    if (
      arrayMobile.length !== 10 ||
      arrayMobile.length > 10 ||
      arrayMobile[0] !== "0"
    ) {
      alert("The phone number you enterd is not valid phone number!");
    } else {
      setFormLoading(true);
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer d9wvK5bQU9oiXQeLhXXhAx6tfAss");

      fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
        method: "POST",
        headers,
        body: JSON.stringify({
          BusinessShortCode: 174379,
          Password:
            "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwODA5MjE1NTU2",
          Timestamp: year + month + day + hour + minute + second,
          TransactionType: "CustomerPayBillOnline",
          Amount: data.total_Price,
          PartyA: 254701385406,
          PartyB: mpesaMobile,
          PhoneNumber: 254708374149,
          CallBackURL: "https://mydomain.com/path",
          AccountReference: "CompanyXLTD",
          TransactionDesc: "Payment of X",
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setFormLoading(false);
          return console.log(result);
        })
        .catch((error) => {
          setFormLoading(false);
          setPayError(true);
          console.log(error);
        });
    }
  }

  const mpesaForm = (
    <>
      <div className="header">
        <img
          src="	https://sapamacash.com/img/lipa_na_mpesa.png"
          alt="PayPal Logo"
        />
        <h4>{`${day} / ${month} / ${year}`}</h4>
      </div>
      <form
        className="payment-form"
        onSubmit={callMpesa}
        style={formLoading ? { display: "none" } : { display: "grid" }}
      >
        <p style={mpesaPayError ? { color: "red" } : { display: "none" }}>
          Sorry, there's a problem with the server.
        </p>
        <input
          type="number"
          placeholder="Mobile"
          onChange={setPhone}
          required
        />
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
      <form
        className="payment-form paypal-form"
        style={formLoading ? { display: "none" } : { display: "grid" }}
      >
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
              <div
                style={formLoading ? { display: "block" } : { display: "none" }}
              >
                <Loader />
              </div>
              {vl.payCardState === "mpesa" ? mpesaForm : payPalForm}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paypal;
