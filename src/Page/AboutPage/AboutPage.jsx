import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav.jsx";
import About from "../../Components/About/About.jsx";
import Explore from "../../Components/Explore/Explore.jsx";

function AboutPage(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getFilteredPosts();
  }, []);

  const getFilteredPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const postsArr = await response.json();

      if (!postsArr.success) return;
      setPosts(postsArr.response);
    } catch (err) {
      console.log(err);
    }
  };

  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.LocationName.toLowerCase();
      return postName.includes(query);
    });
  };
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredPosts = filterPosts(posts, searchQuery);

  return (
    <div className="MainPage">
      {/* <Nav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setUserInState={props.setUserInState}
        user={props.user}
      /> */}
      <About />
    </div>
  );
}
export default AboutPage;
