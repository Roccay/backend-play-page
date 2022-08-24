import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav.jsx";
import "../MainPage/MainPage.css";
import LibraryMap from "../../Components/LibraryMap/LibraryMap.jsx";

function LibraryPage(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentLoc, setCurrentLoc] = useState("lobby");

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = async () => {
    try {
      const response = await fetch("/api/bookmarks");
      const postsArr = await response.json();

      if (!postsArr.success) return;
      setBookmarks(postsArr.response);
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
  const tutorialPanelHandle = () => {
    setCurrentLoc("tutorial");
  };
  return (
    <div className="MainPage">
      <Nav setUserInState={props.setUserInState} user={props.user} />

      <LibraryMap
        designPanelHandle={designPanelHandle}
        tutorialPanelHandle={tutorialPanelHandle}
        backHandle={backHandle}
        currentLoc={currentLoc}
        bookmarks={bookmarks}
      />
      {/* <Explore user={props.user} posts={ posts} /> */}
    </div>
  );
}
export default LibraryPage;
