import React, { useContext, useEffect, useState } from "react";
import "../style sheets/checkout.css";
import { Appcontext } from "../context/Contexts";
import { Link, useNavigate } from "react-router-dom";

function FillDetail() {
  const [formValues, setFormValues] = useState([]);
  const vl = useContext(Appcontext);
  const [itemObj, setItemObj] = useState([]);

  const navigateToFinalStep = useNavigate();
  const backToHome = useNavigate();
  /* useEffect(() => {
    if (vl.addedItems.length < 1) {
      backToHome("/");
    }
  }, [vl.addedItems]); */
  const totalPrice = itemObj.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  useEffect(() => {
    setFormValues((prev) => ({ ...prev, total_Price: totalPrice }));
  }, [totalPrice]);
  function handleSubmit(e) {
    e.preventDefault();
    const usersDeteilObj = formValues;
    usersDeteilObj["items_length"] = vl.addedItems.length;
    (usersDeteilObj[" total_Price"] = totalPrice),
      localStorage.setItem("Detail_Data", JSON.stringify(usersDeteilObj));
    navigateToFinalStep("pay");
  }
  useEffect(() => {
    if (localStorage.getItem("Detail_Data") !== null) {
      const data = JSON.parse(localStorage.getItem("Detail_Data"));
      setFormValues(data);
    }
  }, []);

  const {
    First_Name,
    Last_Name,
    Phone_Number,
    Street,
    City,
    Email,
    Apartment_suite_unit_etc,
    Address,
  } = formValues;
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

  function handleDelete(name) {
    vl.deleteItem(name);
  }
  const oblLength = Object.keys(formValues).length;
  function handleInput(e) {
    const attr = e.target.getAttribute("placeholder");
    const key = attr.replace(/\//g, "_").replace(/\s+/g, "_").replace("..", "");
    const value = e.target.value;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,

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
              value={First_Name}
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={Last_Name}
              onChange={handleInput}
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={Phone_Number}
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Email"
              value={Email}
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
              value={Street}
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Apartment/suite/unit etc.."
              value={Apartment_suite_unit_etc}
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Address"
              value={Address}
              required
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="City"
              value={City}
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
