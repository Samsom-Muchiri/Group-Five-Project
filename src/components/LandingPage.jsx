import React, { useContext, useRef } from "react";
import "../style sheets/LandingPage.css";
import { Appcontext } from "../context/Contexts";

function LandingPage() {
  const vl = useContext(Appcontext);
  function generateHString(number) {
    return "⭐".repeat(number);
  }
  const itemObj = vl.items;
  const item = itemObj.map((itm) => {
    const {
      product_name,
      product_description,
      unit_price,
      product_full_image,
      product_thumbnail,
      ranking,
      created,
      updated,
    } = itm;
    return (
      <div className="item">
        <img src={product_full_image} alt={product_name} />
        <div className="description">
          <h4>{product_name}</h4>
          <div className="desk">
            <p>{product_description}</p>
          </div>
        </div>
        <div className="access">
          <p>{unit_price}</p>
          <button>Add to cart</button>
          <span>{generateHString(ranking)}</span>
        </div>
      </div>
    );
  });
  const slider = useRef();
  function handleScrollLeft() {
    const scrollLenth = slider.current.scrollWidth / 2;
    slider.current.scrollTo({
      left: scrollLenth,
      behavior: "smooth",
    });
  }
  function handleScrollRight() {
    const scrollLenth = slider.current.scrollWidth / -2;
    slider.current.scrollTo({
      left: scrollLenth,
      behavior: "smooth",
    });
  }
  return (
    <div className="item-listing">
      <div className="container">
        <div className="silder-header">
          <h1 className="mobile-header">Green Space</h1>
          <h2>Best offers</h2>
        </div>
        <div className="slider" ref={slider}>
          <div className="slider-button btn-left" onClick={handleScrollLeft}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </div>
          <div className="slider-button btn-right" onClick={handleScrollRight}>
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
          <div className="slider-item-wrapper">
            <div className="silder-item"></div>
            <div className="silder-item"></div>
            <div className="silder-item"></div>
            <div className="silder-item"></div>
            <div className="silder-item"></div>
            <div className="silder-item"></div>
          </div>
        </div>
        <div className="item-container">{item}</div>
      </div>
    </div>
  );
}

export default LandingPage;
