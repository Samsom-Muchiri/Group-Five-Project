import React from "react";
import "../style sheets/checkout.css";

function Payment() {
  return (
    <div className="Pay-container">
      <div className="payment-methods">
        <h1>Choose payment method</h1>
        <div className="paypal">
          <img src="https://1000logos.net/wp-content/uploads/2021/04/Paypal-logo.png" />
          <form className="paypalForm">
            <div>
              <input type="text" className="input1" placeholder="card number" />
              <div className="center">
                <input type="text" placeholder="Expiration" />
                <input type="text" placeholder="CVV" />
              </div>
              <div className="center">
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
              </div>

              <input type="text" placeholder="Billing zip code" />
              <br />
              <button>PLACE ORDER</button>
            </div>
          </form>
        </div>
        <div className="paypal mpesa">
          <img src="	https://www.safaricom.co.ke/images/MicrosoftTeams-image.jpg" />
          <form className="paypalForm ">
            <div>
              <input
                type="nubmer"
                className="input1"
                placeholder="phone number"
              />

              <br />
              <button>PLACE ORDER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
