import React, { useContext, useEffect, useState } from "react";
import "../style sheets/checkout.css";
import { Appcontext } from "../context/Contexts";
import { Link, useNavigate } from "react-router-dom";

function FillDetail() {
  const [formValues, setFormValues] = useState([]);
  const vl = useContext(Appcontext);
  const [itemObj, setItemObj] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const count = itemObj.length;
    setCartCount(count);
    setCartData(itemObj);
  }, []);
  const navigateToFinalStep = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const usersDeteilObj = formValues;
    usersDeteilObj["items_length"] = vl.addedItems.length;
    localStorage.setItem("Detail_Data", JSON.stringify(usersDeteilObj));
    navigateToFinalStep("pay");
  }
  useEffect(() => {
    const count = itemObj.length;
    setCartCount(count);
    setCartData(itemObj);
  }, []);
  useEffect(() => {
    const obj = vl.addedItems.map((item) => ({ ...item, quantity: 1 }));
    setItemObj(obj);
  }, [vl.addedItems]);
  function handleQuantity(e, name) {
    const newQuantity = parseInt(e.target.value, 10);
    setItemObj((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  }
  const totalPrice = itemObj.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  function handleDelete(name) {
    vl.deleteItem(name);
  }
  /* detailS: detailForm, */
  /*   console.log(vl.detailS);
   */ const oblLength = Object.keys(formValues).length;
  function handleInput(e) {
    const attr = e.target.getAttribute("placeholder");
    const key = attr.replace(" ", "_");
    const value = e.target.value;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      total_Price: totalPrice,
      [key]: value,
    }));
  }

  const newItem = itemObj.map((itm, i) => {
    const { name, price, image, quantity } = itm;
    return (
      <div className="cartitem" key={i}>
        <div className="cart-item-container">
          <img src={image} alt={name} />
          <div className="item-name">
            <p>{name}</p>
          </div>
          <i
            className="fa fa-trash"
            aria-hidden="true"
            onClick={() => handleDelete(name)}
          ></i>
        </div>
        <div className="price-container">
          <p>Price: Ksh{price}</p>
          <span>
            <input
              type="number"
              onChange={(e) => handleQuantity(e, name)}
              value={quantity}
            />
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

          <div className="next">
            <label htmlFor="submit-form">
              <button
                style={
                  oblLength < 8
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
                onClick={() => vl.detailIsFill()}
              >
                Next Step
              </button>
            </label>
          </div>
        </form>
        <div className="orders">
          <center>
            <h3>Your orders</h3>
            <span>Total: Ksh{totalPrice}</span>
          </center>
          <div className="center">
            <div className="scroller-2">
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
