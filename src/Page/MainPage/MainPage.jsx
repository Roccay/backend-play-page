import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav.jsx";
import "./MainPage.css";
import Explore from "../../Components/Explore/Explore.jsx";

function MainPage(props) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState({
    Tags: "",
  });
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    getPosts();
  }, [search]);
  const updateSearch = async () => {
    try {
      const response = await fetch(`/api/posts/games/${search.Tags}`);
      setSearch({
        Tags: search.Tags,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getPosts = async () => {
    try {
      if (search.Tags === "") {
        const response = await fetch("/api/posts");

        const postsArr = await response.json();
        console.log("-111--", postsArr.response);
        if (!postsArr.success) return;
        setPosts(postsArr.response);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="MainPage">
      <Nav
        user={props.user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        updateSearch={updateSearch}
        search={search}
      />
      <Explore user={props.user} posts={posts} />
    </div>
  );
}
export default MainPage;
