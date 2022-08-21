import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import TrailCard from "../../Components/TrailCard/TrailCard";
import "./ProfilePage.css";

function ProfilePage(props) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split(".")[1])).user; // decode jwt token
      setUser(userDoc);
    }
    getProfile();
    getPosts();
  }, [posts]);
  const getPosts = async () => {
    try {
      const response = await fetch("/api/posts");

      const postsArr = await response.json();
      let foundEvent = [];
      postsArr.response.forEach((element) => {
        if (element.Author === props.user._id) {
          foundEvent.push(element);
        }
      });

      if (!postsArr.success) return;
      setPosts(foundEvent);
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch("/users");

      const postsArr = await response.json();
      console.log("-----", postsArr, response);
      let foundEvent = [];
      // postsArr.response.forEach((element) => {
      //   if (element.Author === props.user._id) {
      //     foundEvent.push(element);
      //   }
      // });

      if (!postsArr.success) return;
      setProfile(postsArr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      let fetchResponse = await fetch("/api/posts/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_id: id }),
      });
      if (!fetchResponse.ok) throw new Error("Fetch failed");
      let posts = await fetchResponse.json();
      setPosts(posts);
    } catch (err) {}
  };

  return (
    <div className="ProfilePage">
      <div className="profile-header">
        <h1>{user.name} 的 個人倉庫</h1>
      </div>
      <div className="header">
        <p>{user.name} 的 遊戲庫</p>
      </div>
      <div className="game-container">
        <div className="profilecard-container">
          {posts &&
            posts.map((e) => (
              <ProfileCard
                {...e}
                handleDelete={handleDelete}
                user={props.user}
              />
            ))}
        </div>
      </div>
      <div className="header">
        <p>{user.name} 的 圖書館</p>
      </div>
    </div>
  );
}

export default ProfilePage;
