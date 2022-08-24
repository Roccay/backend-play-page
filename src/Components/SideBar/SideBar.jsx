import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar(props) {
  return (
    <section className="sideBar">
      <div className="butHolder">
        <Link to="/games">
          <button> 游戏录</button>
        </Link>
        <Link to="/library">
          <button> 图书馆</button>
        </Link>
        <Link to="/">
          {" "}
          <button> 关于</button>
        </Link>
      </div>
    </section>
  );
}

export default SideBar;
