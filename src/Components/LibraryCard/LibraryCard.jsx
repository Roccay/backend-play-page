import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LibraryCard.css";
function LibraryCard(props) {
  return (
    <div className="LibraryCard">
      <div className="title">
        <a href={props.Link} target="_blank">
          <p>
            {props.Title} 【{props.Language}】
          </p>
        </a>
      </div>
      <div
        className="ButtonsInLibrary"
        style={{
          display: props.user._id === props.profile._id ? "" : "none",
        }}
      >
        <Link to={"/update/" + props._id}>
          <button className="ButtonEdit">修改</button>
        </Link>
        <button
          className="ButtonDelete"
          onClick={() => props.handleDelete(props._id)}
        >
          刪除
        </button>
      </div>
    </div>
  );
}

export default LibraryCard;
