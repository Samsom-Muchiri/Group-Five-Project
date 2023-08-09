import React, { useContext, useEffect, useRef, useState } from "react";
import "../style sheets/cart.css";
import { Appcontext } from "../context/Contexts";
import { Link } from "react-router-dom";

function CartItem() {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const vl = useContext(Appcontext);
  const [itemObj, setItemObj] = useState([]);
  useEffect(() => {
    const count = itemObj.length;
    setCartCount(count);
    setCartData(itemObj);
  }, []);
  useEffect(() => {
    const obj = vl.addedItems.map((item) => ({ ...item, quantity: 1 }));
    setItemObj(obj);
  }, [vl.addedItems]);
  const q = vl.cartStatus;
  function closeCart() {
    vl.toggleCart(q);
  }
  const ccount = vl.addedItems.length;

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
  const totalPrice = itemObj.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const currencyFormaterKsh = new Intl.NumberFormat("en-KE", {
    format: "currency",
    currency: "KES",
  });
  const currencyPrice = currencyFormaterKsh.format(totalPrice);
  const newItem = itemObj.map((itm, i) => {
    const { name, price, image, quantity } = itm;
    const formatedPrice = currencyFormaterKsh.format(price);
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
          <p>
            Price: <b>Ksh{formatedPrice}</b>
          </p>
          <span>
            Quantity
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantity(e, name)}
            />
          </span>
        </div>
      </div>
    );
  });
  const emptyMessage = (
    <div className="emptyMessage">
      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
      <h1>Your cart is empty</h1>
      <p>It looks like you haven't added any items to your cart yet.</p>
    </div>
  );
  return (
    <div className="cart-item" style={vl.cartPos}>
      <center>
        <h3>Your Cart</h3>
        <span>Total: Ksh{currencyPrice}</span>
      </center>
      <div className="center">
        <div className="close-cart" datacount={ccount} onClick={closeCart}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="scroller">
          <div className="cart-items-container">
            <div className="div">
              {itemObj.length === 0 ? emptyMessage : newItem}
            </div>
            <div className="checkout">
              <h3>Check Out</h3>
              <div>
                {/* commented this lines to check mpesa API */}
                <Link
                  to={/* itemObj.length === 0 ? "/" : */ "checkout"}
                  /* style={
                    itemObj.length === 0
                      ? { cursor: "not-allowed" }
                      : { pointerEvents: "all" }
                  } */
                >
                  <button className="checkout-btn" onClick={closeCart}>
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
