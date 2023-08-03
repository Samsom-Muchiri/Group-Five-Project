import React, { useContext, useState } from "react";
import "../style sheets/checkout.css";
import { Appcontext } from "../context/Contexts";
import { Link } from "react-router-dom";

function FillDetail() {
  const [formValues, setFormValues] = useState([]);
  const vl = useContext(Appcontext);
  const itemObj = vl.addedItems;

  const [isSubmited, setIsSubmited] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmited(true);
    localStorage.setItem("Detail_Data", JSON.stringify(formValues));
  }
  const oblLength = Object.keys(formValues).length;
  function handleInput(e) {
    const attr = e.target.getAttribute("placeholder");
    const value = e.target.value;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      total_Price: totalPrice,
      [attr]: value,
    }));
  }

  const totalPrice = itemObj.reduce((acc, price) => acc + price.price, 0);
  console.log(oblLength);
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
    <div>
      <div className="detail-container">
        <form onSubmit={handleSubmit} className="input-form">
          <h3>Your Details</h3>
          <hr />
          <div className="inputs">
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              onChange={handleInput}
            />
            <input
              type="number"
              placeholder="Phone Number"
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Email"
              required
              onChange={handleInput}
            />
          </div>
          <h3>Delivery details</h3>
          <hr />
          <div className="inputs">
            <input
              type="text"
              placeholder="Street"
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Apartment/suite/unit etc.."
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Address"
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="City"
              required
              onChange={handleInput}
            />
          </div>
          <h4>Leave a note for us</h4>
          <textarea
            cols={40}
            rows={4}
            placeholder="Leave a note for us"
            onChange={handleInput}
          />
          <Link to={oblLength >= 8 ? "pay" : ""}>
            <div className="next">
              <label htmlFor="submit-form">
                <button
                  id="submit-form"
                  style={
                    oblLength < 8
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                >
                  Next Step
                </button>
              </label>
            </div>
          </Link>
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
    </div>
  );
}

export default FillDetail;
