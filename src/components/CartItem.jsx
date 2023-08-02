import React, { useContext, useRef, useState } from "react";
import "../style sheets/cart.css";
import { Appcontext } from "../context/Contexts";

function CartItem() {
  const [cartCount, setCartCount] = useState(0);
  const [quantityCount, setQuantityCount] = useState(0);
  const vl = useContext(Appcontext);
  const itemObj = vl.addedItems;
  useState(() => {
    const count = itemObj.length;
    setCartCount(count);
  }, []);
  const q = vl.cartStatus;
  function closeCart() {
    vl.toggleCart(q);
  }
  function handleQuantity(e) {
    const newVl = e.target.value;
    setQuantityCount((prev) => prev + newVl);
  }

  const totalPrice = itemObj.reduce((acc, price) => acc + price.price, 0);
  const newItem = itemObj.map((itm) => {
    const { name, price, image } = itm;
    return (
      <div className="cartitem">
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
            <input type="number" onChange={handleQuantity} />
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
        <span>Total: Ksh{totalPrice}</span>
      </center>
      <div className="center">
        <div className="close-cart" datacount={cartCount} onClick={closeCart}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="scroller">
          <div className="cart-items-container">
            <div className="div">{newItem}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
