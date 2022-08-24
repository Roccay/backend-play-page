import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import MenuButton from "../MenuButton/MenuButton";
import "./Nav.css";
import ProfileButton from "../ProfileButton/ProfileButton";

import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Nav(props) {
  const [showLogin, setShowLogin] = useState({
    showLogin: false,
  });

  const [showSignUp, setShowSignUp] = useState({
    showSignUp: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setUserInState(null);
    setShowSignUp({ showSignUp: false });
    setShowLogin({ showLogin: false });
  };

  return (
    <div className="nav">
      <SearchBar
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
        setUserInState={props.setUserInState}
        user={props.user}
      />

      <div
        className="nav-right"
        style={{ display: props.user ? "none" : "flex" }}
      >
        <button
          className="LoginButton"
          onClick={() => {
            setShowLogin({ showLogin: true });
          }}
        >
          登入
        </button>
        <button
          className="SignUpButton"
          onClick={() => {
            setShowSignUp({ showSignUp: true });
          }}
        >
          注册
        </button>
        <LoginForm
          showLogin={showLogin.showLogin}
          setShowLogin={setShowLogin}
          setUserInState={props.setUserInState}
          user={props.user}
        />
        <SignUpForm
          showSignUp={showSignUp.showSignUp}
          setShowSignUp={setShowSignUp}
          setUserInState={props.setUserInState}
          user={props.user}
        />{" "}
      </div>

      <div
        className="nav-right"
        style={{ display: props.user ? "flex" : "none" }}
      >
        {" "}
        <MenuButton
          name="登記遊戲"
          styleRef="UploadSpotButton"
          route="/createPost"
          user={props.user}
        />
        <MenuButton
          name="登記資源"
          styleRef="UploadSpotButton"
          route="/createBookmark"
          user={props.user}
        />
        <ProfileButton
          name="我的庫"
          styleRef=""
          route={props.user ? "/profile/" + props.user._id : ""}
          className="my-profile-button"
        />
        <MenuButton
          name="登出"
          styleRef="MenuButton"
          route="/"
          onClick={handleLogout}
        />
        <button className="SignOutButton MenuButton" onClick={handleLogout}>
          登出
        </button>
      </div>
    </div>
  );
}

export default Nav;
