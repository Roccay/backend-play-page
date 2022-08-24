import React from "react";
import { Link } from "react-router-dom";
import "./TrailCardDetails.css";

function TrailCardDetails(props) {
  return (
    <div
      className="details-popup"
      style={{ display: props.showDetails ? "flex" : "none" }}
    >
      <div className="details-container">
        <div className="details-header-container">
          <div className="details-header-text">{props.GameName}</div>
          <div>
            <button
              className="details-close-button-container"
              onClick={() => {
                props.setShowDetails({ showDetails: false });
              }}
            >
              關閉
            </button>
          </div>
        </div>
        <div className="details-data-container">
          <div className="details-row">
            <div className="details-row-label">作者:</div>{" "}
            <Link to={"/profile/" + props.Author}>
              <div>{props.AuthorName}</div>
            </Link>
          </div>

          <div className="details-row">
            <div className="details-row-label">簡介:</div>
            <div>{props.Description}</div>
          </div>
          <div className="details-row">
            <div className="details-row-label">標籤:</div>
            <div>{props.Tags}</div>
          </div>

          <div className="details-row">
            <div className="details-row-label">價格:</div>
            <div>{props.Fee === 0 ? "免費" : "￥" + props.Fee}</div>
          </div>
          <div className="details-row">
            <div className="details-row-label">Reviews:</div>
          </div>
          {/* <div className="details-row-bottom">
                        <div className="details-reviews"></div>
                    </div> */}
        </div>
      </div>
    </div>
  );
}

export default TrailCardDetails;
