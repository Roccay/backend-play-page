import React from "react";

import { Component } from "react";

import { Link } from "react-router-dom";

import "./ProfileCard.css";

function ProfileCard(props) {
  return (
    <div id="profile-card">
      <div>Name:&nbsp;{props.LocationName}</div>
      <div>Location:&nbsp;{props.Address}</div>
      <div>Fees:&nbsp;{props.Fee}</div>
      <div>Description:&nbsp;{props.Description}</div>
      <div className="profile-card-button-container">
        <div>
          {" "}
          <Link to={"/update/" + props._id}>
            {" "}
            <button className="ButtonEdit">Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button
            className="ButtonDelete"
            onClick={() => props.handleDelete(props._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
