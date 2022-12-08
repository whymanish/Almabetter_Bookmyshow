import React from "react";

const Slots = ({ label, cb, movieData }) => {
  return (
    <div
      className="slot-container flex"
      onClick={() => cb(label)}
      style={{ backgroundColor: `${movieData === label ? "#00C1D8" : "white"}` }}
    >
      <div className="d-flex justify-content-center">
      </div>
      <p >{label}</p>
    </div>
  );
};

export default Slots;
