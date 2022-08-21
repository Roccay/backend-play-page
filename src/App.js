import "./App.css";

import React, { Component } from "react";
import MainPage from "./Page/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import PostCreatePage from "./Page/PostCreatePage/PostCreatePage";
import PostUpdatePage from "./Page/PostUpdatePage/PostUpdatePage";
import ProfilePage from "./Page/ProfilePage/ProfilePage";
import SideBar from "./Components/SideBar/SideBar";
import AboutPage from "./Page/AboutPage/AboutPage";

class App extends Component {
  //-----------
  state = {
    user: null,
  };

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData });
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split(".")[1])).user; // decode jwt token
      this.setState({ user: userDoc });
    }
  }

  //-----------
  render() {
    return (
      <div className="App">
        <SideBar />
        <Routes>
          <Route
            path="/games"
            element={
              <MainPage
                user={this.state.user}
                setUserInState={this.setUserInState}
              />
            }
          />
          <Route path="/" element={<AboutPage user={this.state.user} />} />
          <Route
            path="/createPost"
            element={<PostCreatePage user={this.state.user} />}
          />

          <Route
            path="/profile/:id"
            element={<ProfilePage user={this.state.user} />}
          />

          <Route
            path="/update/:id"
            element={<PostUpdatePage user={this.state.user} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
