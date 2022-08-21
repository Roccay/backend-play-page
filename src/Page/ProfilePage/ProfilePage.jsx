import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import "./ProfilePage.css";

function ProfilePage(props) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split(".")[1])).user; // decode jwt token
      setUser(userDoc);
    }

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
        <h1>&nbsp;&nbsp;&nbsp;Profile Page</h1>
      </div>
      <div className="profile-container">
        <div>
          <p>Name: {user.name}</p>
        </div>
        <div>
          <p>Email: {user.email}</p>
        </div>
        <div>
          <p>Your activities:</p>
        </div>
        <div className="profilecard-container">
          {posts &&
            posts.map((e) => (
              <ProfileCard {...e} handleDelete={handleDelete} />
            ))}
        </div>
        <div className="profile-button-container">
          <Link to="/">
            <button className="profile-button">BACK</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
