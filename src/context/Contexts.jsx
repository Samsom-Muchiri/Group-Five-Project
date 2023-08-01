import React, { createContext, useState } from "react";

const Appcontext = createContext();
function Contexts({ children }) {
  const [cartState, setCartState] = useState({ transform: "translate(150%)" })
  const [isClosed, setIsClosed] = useState(true)
  const values = {
    cartPos: cartState,
    toggleCart: handleCartPos,
    cartStatus: isClosed,
  }
  function handleCartPos(q) {
    setIsClosed(prev => !prev)
    if (q) {
      setCartState({ transform: "translate(0%)" })
    } else {
      setCartState({ transform: "translate(150%)" })
    }
  }
  return <Appcontext.Provider value={values}>{children}</Appcontext.Provider>;
}

export { Contexts, Appcontext };
