import axios from "axios";
import React, { useState, useEffect } from "react";

function Rooms({ user }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9002/roomDetails").then((res) => {
      console.log(res.data.room)
      setRooms(res.data.room);
    });
  }, []);
  return (
    <div className="container text-center">
      <h3 id="heading">ROOMS AVAILABLE</h3>
      <table className="table table-bordered mt-5">
        <thead className="thead table-dark">
          <tr>
            <th>Hostel Name</th>
            <th>Room Number</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((item, index) => {
            return item.gender === user.gender ? (
              <tr
                key={index}
                className={item.availability ? "table-success" : "table-danger"}
              >
                <td>{item.hostelNumber}</td>
                <td>{item.roomNumber}</td>
                {item.availability ? <td>"YES"</td> : <td>"NO"</td>}
              </tr>
            ) : (
              <tr></tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Rooms;
