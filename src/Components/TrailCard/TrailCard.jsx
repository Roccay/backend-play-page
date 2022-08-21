import React, { useState, useEffect } from "react";
import "./TrailCard.css";
import TrailCardDetails from "../TrailCardDetails/TrailCardDetails";

function TrailCard(props) {
  const [showDetails, setShowDetails] = useState({
    showDetails: false,
  });

  return (
    <div className="ExploreItem">
      <img
        className="photo"
        src={
          props.img ||
          "https://wx3.sinaimg.cn/mw1024/8e370758gy1h4543b4ssyj21e00xcdos.jpg"
        }
      />
      <TrailCardDetails
        showDetails={showDetails.showDetails}
        setShowDetails={setShowDetails}
        {...props}
      />
      <div
        className="item-bar-header"
        onClick={() => {
          setShowDetails({ showDetails: true });
        }}
      >
        <div className="item-bar-header-text">
          {props.GameName}
          <br />
          <span>{props.Tags}</span>
        </div>

        <div className="item-bar-header-pic-container">
          <img
            src="../../Bookmark.svg"
            alt=""
            className="item-bar-header-pic"
          />
        </div>
      </div>
    </div>
  );
}

export default TrailCard;
