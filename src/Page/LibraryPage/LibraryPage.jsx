import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav.jsx";
import "../MainPage/MainPage.css";
import LibraryMap from "../../Components/LibraryMap/LibraryMap.jsx";

function LibraryPage(props) {
  const [posts, setPosts] = useState([]);
  const [currentLoc, setCurrentLoc] = useState("lobby");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const postsArr = await response.json();

      if (!postsArr.success) return;
      setPosts(postsArr.response);
    } catch (err) {
      console.log(err);
    }
  };

  const designPanelHandle = () => {
    setCurrentLoc("design");
  };
  const backHandle = () => {
    setCurrentLoc("lobby");
  };
  return (
    <div className="MainPage">
      <Nav setUserInState={props.setUserInState} user={props.user} />

      <LibraryMap
        designPanelHandle={designPanelHandle}
        backHandle={backHandle}
        currentLoc={currentLoc}
      />
      {/* <Explore user={props.user} posts={ posts} /> */}
    </div>
  );
}
export default LibraryPage;
