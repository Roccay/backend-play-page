import React from "react";
import "./About.css";

function About(props) {
  return (
    <div className="Header">
      <div className="para">欢 迎 来 到 玩 之 宇 宙</div>
      <img src={process.env.PUBLIC_URL + "/Header.png"} alt="logo" />
      <div className="groupInfo">
        此网站为「Backend：玩」群附属网站
        <br /> QQ群号：暂未公开
      </div>
    </div>
  );
}

export default About;
