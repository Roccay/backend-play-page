import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import TrailCardDetails from "../TrailCardDetails/TrailCardDetails";
function ProfileCard(props) {
  const [showDetails, setShowDetails] = useState({
    showDetails: false,
  });
  return (
    <div id="profile-card">
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

          <div className="item-bar-header-pic-container"></div>
        </div>
      </div>
      <div
        className="Buttons"
        style={{
          display: props.user._id === props.profile._id ? "" : "none",
        }}
      >
        <Link to={"/update/" + props._id}>
          <button className="ButtonEdit">修改</button>
        </Link>
        <button
          className="ButtonDelete"
          onClick={() => props.handleDelete(props._id)}
        >
          刪除
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;

//  <div>Name:&nbsp;{props.GameName}</div>
//       <div>Location:&nbsp;{props.AuthorName}</div>
//       <div>Fees:&nbsp;{props.Fee}</div>
//       <div>Description:&nbsp;{props.Description}</div>
//       <div className="profile-card-button-container">
//         <div>
//           {" "}
//           <Link to={"/update/" + props._id}>
//             {" "}
//             <button className="ButtonEdit">Edit</button>
//           </Link>
//         </div>
//         <div>
//           {" "}
//           <button
//             className="ButtonDelete"
//             onClick={() => props.handleDelete(props._id)}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
