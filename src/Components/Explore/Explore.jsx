import React from "react";
import TrailCard from "../TrailCard/TrailCard";
import "./Explore.css";

function Explore(props) {
  return (
    <div className="Explore">
      {props.posts.map((p) => (
        <TrailCard key={p._id} {...p} />
      ))}
    </div>
  );
}

export default Explore;
