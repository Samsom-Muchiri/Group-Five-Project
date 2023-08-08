import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "../style sheets/detailpage.css";
import { Appcontext } from "../context/Contexts";

function ItemDetail() {
  const { detail } = useParams();
  const vl = useContext(Appcontext);
  const items = vl.items;
  const item = items.find((itm) => itm.product_name === detail);
  function generateHString(number) {
    return "⭐".repeat(number);
  }
  const itemsData = vl.addedItems;
  function handleAddToCart(product_name, unit_price, product_full_image, e) {
    const foundObject = itemsData.find((item) => item.name === product_name);

    const ItemInfo = {
      name: product_name,
      price: unit_price,
      image: product_full_image,
    };

    if (foundObject === undefined) {
      vl.addTocartF(ItemInfo);
    } else {
      if (foundObject.product_name === product_name) {
        console.log(foundObject.product_name);
        /*  vl.addTocartF(ItemInfo); */
      }
    }
  }
  if (item !== undefined) {
    const {
      product_name,
      product_description,
      unit_price,
      product_full_image,
      product_thumbnail,
      ranking,
      created,
      updated,
    } = item;
    return (
      <div className="div4">
        <div className="item-container1">
          <img src={product_full_image} alt={product_name} />
          <div className="desc">
            <h1>{product_name}</h1>
            <p>{product_thumbnail}</p>
            <p>{product_description}</p>
            <p>{created}</p>
            <p>{updated}</p>
            <p>{unit_price}</p>
            <div className="rank-d">
              <p>{generateHString(ranking)} </p>
              <button
                className="cart-Btn"
                onClick={() =>
                  handleAddToCart(product_name, unit_price, product_full_image)
                }
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
