import React from "react";

function Profile({ user }) {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center text-center">
      <div className="profile container w-25">
        <img
          src={require("../../user.png")}
          style={{ width: "40%", height: "130px", paddingTop: "20px" }}
        />
        <br />
        Name - {user.name}
        <br />
        Roll No. - {user.rollno}
        <br />
        Gender - {user.gender}
        <br />
        Email - {user.email}
        <br />
        Hostel Booked - {user.booked ? "Yes" : "No"}
      </div>
    </div>
  );
}

export default Profile;
