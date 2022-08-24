import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import TrailCard from "../../Components/TrailCard/TrailCard";
import "./ProfilePage.css";

function ProfilePage(props) {
  const params = useParams();
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
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch(`/users/profile/${params.id}`);

      const profileInfo = await response.json();
      if (!profileInfo.success) return;
      setPosts(profileInfo.posts);
      setProfile(profileInfo.response);
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
        <h1>{profile.name} 的 個人倉庫</h1>
      </div>
      <div className="header">
        <p>{profile.name} 的 遊戲庫</p>
      </div>
      <div className="game-container">
        <div className="profilecard-container">
          {posts &&
            posts.map((e) => (
              <ProfileCard
                key={e._id}
                {...e}
                handleDelete={handleDelete}
                user={props.user || ""}
                profile={profile}
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
