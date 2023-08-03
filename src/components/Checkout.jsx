import React, { useContext, useState } from "react";
import "../style sheets/checkout.css";
import { Appcontext } from "../context/Contexts";
import { Link } from "react-router-dom";

function Checkout() {
  const [cartCount, setCartCount] = useState(0);
  const vl = useContext(Appcontext);
  const itemObj = vl.addedItems;
  const totalPrice = itemObj.reduce((acc, price) => acc + price.price, 0);
  const newItem = itemObj.map((itm, i) => {
    const { name, price, image } = itm;
    return (
      <div className="cartitem" key={i}>
        <div className="cart-item-container">
          <img src={image} alt={name} />
          <div className="item-name">
            <p>{name}</p>
          </div>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </div>
        <div className="price-container">
          <p>Price: Ksh{price}</p>
          <span>
            <input type="number" />
          </span>
        </div>
      </div>
    );
  });
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
            <i className="fa fa-check" aria-hidden="true"></i>
          </div>
          <div className="make-payment prs">
            <span>Make payment</span>
            <i className="fa fa-check" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="detail-container">
        <form>
          <h3>Your Getails</h3>
          <hr />
          <div className="inputs">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="number" placeholder="Phone Number" />
            <input type="text" placeholder="Email" />
          </div>
          <h3>Delivery details</h3>
          <hr />
          <div className="inputs">
            <input type="text" placeholder="Street" />
            <input type="text" placeholder="Apartment/suite/unite etc.." />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="" />
          </div>
          <h4>Leave a note for us</h4>
          <textarea cols={40} rows={2} placeholder="Leave a note for us" />
        </form>
        <div className="orders">
          <center>
            <h3>Your orders</h3>
            <span>Total: Ksh{totalPrice}</span>
          </center>
          <div className="center">
            <div className="scroller">
              <div className="cart-items-container">
                <div className="div">{newItem}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="next">
        <Link to="pay">
          <button>Next Step</button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
