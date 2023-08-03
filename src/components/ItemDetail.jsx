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
  console.log(created);
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
          <p>{generateHString(ranking)}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
