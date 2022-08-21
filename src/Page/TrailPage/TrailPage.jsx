import React, { useState, useEffect } from "react";
import TrailCard from "../../Components/TrailCard/TrailCard";

function TrailPage() {
  const [trail, setUser] = useState([]);

  useEffect(() => {
    getTrail();
  }, []);

  const getTrail = async () => {
    try {
      const response = await fetch("/api/posts");
      const trailArr = await response.json();
      console.log(trailArr);
      if (!trailArr.sucsess) return;
      setUser(trailArr.response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="TrailPage">
      <h1>Trail Page</h1>
      {trail && trail.map((t) => <TrailCard {...t} />)}
    </div>
  );
}

export default TrailPage;
