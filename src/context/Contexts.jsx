import React, { createContext, useEffect, useState } from "react";

const Appcontext = createContext();

function Contexts({ children }) {
  const [cartState, setCartState] = useState({
    transform: "translate(150%)",
  });
  const [isClosed, setIsClosed] = useState(true);
  const [itemsData, setItemsData] = useState([]);
  const [userState, setUserState] = useState(null);
  const [clckedItem, setClickedItem] = useState([]);
  const [detailForm, setDetailForm] = useState(false);
  const [payCardIsOpen, setPayCardIsOpen] = useState(false);

  const PRODUCT_URL = " http://ecommerce.muersolutions.com/api/v1/products";

  const values = {
    cartPos: cartState,
    toggleCart: handleCartPos,
    cartStatus: isClosed,
    userIsLoged: userState,
    items: itemsData,
    addedItems: clckedItem,
    addTocartF: handleAddtocart,
    deleteItem: handleDelete,
    openPay: openPayCard,
    payCardState: payCardIsOpen,
    closePay: closePayCard,
    detailS: detailForm,
    detailIsFill: fn,
    setUser: setUserName,
  };
  /* handle add to cart data */
  function handleAddtocart(ItemInfo) {
    setClickedItem((prev) => [...prev, ItemInfo]);
  }
  /* Fetch products */
  useEffect(() => {
    fetch(PRODUCT_URL)
      .then((res) => {
        if (!res.ok) {
          alert("Failed");
        }
        return res.json();
      })
      .then((data) => setItemsData(data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const SU = localStorage.getItem("user");
      const storedUser = JSON.parse(SU);

      setUserState(storedUser);
    }
  }, []);
  function setUserName(userInfo) {
    setUserState(userInfo);
  }
  /* Check location */
  function handleCartPos(q) {
    setIsClosed((prev) => !prev);
    if (q) {
      setCartState({ transform: "translate(0%)" });
    } else {
      setCartState({ transform: "translate(150%)" });
    }
  }

  function handleDelete(name) {
    const newObj = clckedItem.filter((itm) => itm.name !== name);
    setClickedItem(newObj);
  }

  function fn() {
    setDetailForm(true);
  }

  function openPayCard(type) {
    setPayCardIsOpen(type);
  }
  function closePayCard() {
    setPayCardIsOpen(false);
  }

  return <Appcontext.Provider value={values}>{children}</Appcontext.Provider>;
}

export { Contexts, Appcontext };
