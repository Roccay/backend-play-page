import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav.jsx";
import About from "../../Components/About/About";
import TrailCard from "../../Components/TrailCard/TrailCard.jsx";
import Map from "../../Components/Map/Map.jsx";
function FilteredResult() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getFilteredPosts();
  }, []);

  const getFilteredPosts = async () => {
    try {
      const response = await fetch("/api/posts");

      const postsArr = await response.json();

      console.log("FILTERED", postsArr.filteredPosts);
      if (!postsArr.success) return;
      setPosts(postsArr.filteredPosts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="MainPage">
      <Nav />
      <Map />
      {posts && posts.map((p) => <TrailCard key={p._id} {...p} />)}
      filtered result display here...
      <About />
    </div>
  );
}
export default FilteredResult;
