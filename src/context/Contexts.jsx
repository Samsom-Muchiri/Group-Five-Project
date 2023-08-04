import React, { createContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Appcontext = createContext();

function Contexts({ children }) {
  const [cartState, setCartState] = useState({
    transform: "translate(150%)",
  });
  const [isClosed, setIsClosed] = useState(true);
  const [itemsData, setItemsData] = useState([]);
  const [userState, setUserState] = useState(null);
  const [clckedItem, setClickedItem] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [users, setUsers] = useState([
    {
      first_name: "string",
      last_name: "string",
      email: "string",
      is_active: true,
      created: "2019-08-24T14:15:22Z",
      updated: "2019-08-24T14:15:22Z",
    },
    {
      first_name: "string2",
      last_name: "string2",
      email: "string2",
      is_active: true,
      created: "2019-08-24T14:15:22Z",
      updated: "2019-08-24T14:15:22Z",
    },
  ]);

  const PRODUCT_URL = " http://ecommerce.muersolutions.com/api/v1/products";

  const values = {
    cartPos: cartState,
    toggleCart: handleCartPos,
    cartStatus: isClosed,
    formFunction: handleForms,
    userIsLoged: userState,
    items: itemsData,
    addedItems: clckedItem,
    addTocartF: handleAddtocart,
    deleteItem: handleDelete,
    logOut: logOutF,
    detailS: detailForm,
    detailIsFill: fn,
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

  /* Check user state */
  function findUser(userEmail) {
    // Assuming you have an array of users
    const foundUser = users.filter((usr) => usr.email === userEmail);
    return foundUser;
  }

  if (localStorage.getItem("user") !== null) {
    const SU = localStorage.getItem("user");
    const storedUser = JSON.parse(SU);
    const userEmail = storedUser.email; // Replace "s" with the email you want to search for
    const foundUser = findUser(userEmail);

    useEffect(() => {
      if (foundUser !== []) {
        setUserState(storedUser.first_name);
      }
    }, []);
  }

  const SIGN_URL = "http://ecommerce.muersolutions.com/api/v1/user/signup";

  function handleForms(data) {
    setIsSubmited((prev) => !prev);

    fetch(SIGN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Failed");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => console.log(error));
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

  function logOutF() {
    localStorage.removeItem("user");
    setUserState(null);
    <Navigate path="/" />;
  }

  function fn() {
    console.log("submited");
    setDetailForm(true);
  }

  return <Appcontext.Provider value={values}>{children}</Appcontext.Provider>;
}

export { Contexts, Appcontext };
