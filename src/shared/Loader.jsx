import React from "react";
import loader from '../image/loader.gif';

export default function Loader() {
  return (
    <div
      role="status"
      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 "
    >
      <img src={loader} alt="loader SVG" />
      <span style={{ color: "white" }}>Loading...</span>
    </div>
  );
}
