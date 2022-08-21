import React from "react";
import { Link } from "react-router-dom";
import "./MenuButton.css"

function MenuButton(props) {
  return (
    <div style={{ display: props.user ? "flex" : "none" }}>
      <>
        <Link to={props.route}>
          <button className="MenuButton">{props.name}</button>
        </Link>
      </>

    </div>

  );
}

export default MenuButton;
