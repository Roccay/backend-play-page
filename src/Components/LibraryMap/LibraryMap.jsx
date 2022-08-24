import React from "react";
import "./LibraryMap.css";

function LibraryMap(props) {
  return (
    <div className="LibraryMap">
      <div
        className="wrapper"
        style={{ display: props.currentLoc == "lobby" ? "" : "none" }}
      >
        <div className="TopContainer">
          <div className="designPanel" onClick={props.designPanelHandle}>
            設計類
          </div>
        </div>
        <div className="middleContainer">
          <div className="tutorialPanel" onClick={props.tutorialPanelHandle}>
            教程類
          </div>
          <div className="middleRightContainer">
            <div className="referencePanel">參考類</div>
            <div className="otherPanel">其他類</div>
          </div>
        </div>
      </div>
      <button
        className="backButtonInLibrary"
        onClick={props.backHandle}
        style={{ display: props.currentLoc == "lobby" ? "none" : "" }}
      >
        返回
      </button>
    </div>
  );
}

export default LibraryMap;
