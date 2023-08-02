import React, { useRef } from "react";
import "../style sheets/landingPage.css";

function LandingPage() {
  const slider = useRef();
  function handleScrollLeft() {
    const scrollLenth = slider.current.scrollWidth / 2;
    console.log(scrollLenth);
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
  console.log("renderd");
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
      </div>
    </div>
  );
}

export default LandingPage;
