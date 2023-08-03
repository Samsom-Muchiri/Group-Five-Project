import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ItemDescription() {
  const { detail } = useParams();
  /*  console.log(detail);
  console.log("dee"); */
  useEffect(() => {}, []);
  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default ItemDescription;
