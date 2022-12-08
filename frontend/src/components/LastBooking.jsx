import React from "react";

const LastBooking = ({ data }) => {
  return (
    <>
      {data.length === 0 || !data ? (
        <h4 style={{ color: "#F33356" }}>NO BOOKINGS FOUND ! THANK YOU</h4>
      ) : (
        <div className="booking-container">
          <div className="heading">
            <h2 style={{fontFamily:"Arial"}}>Last Booking Details :</h2>
          </div>
          <div className="booking-content">
            {data.seats.map((el, i) => (
              <p key={i}>
                <span className="bold" style={{color:"#00C1D8"}}>{el.seatName} : {el.seats}</span>
              </p>
            ))}
            <p className="moviename">
              <span className="bold" style={{color:"#565AF1"}}>Movie : {data.movie}</span>
            </p>
            <p className="time">
              <span className="bold" style={{color:"red"}}>Time : {data.slot} </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LastBooking;
