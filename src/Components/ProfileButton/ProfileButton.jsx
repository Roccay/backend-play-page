import React from "react";
import { Link } from "react-router-dom";
import "./ProfileButton.css"

function ProfileButton(props) {
    return (
        <>
            <Link to={props.route}>
                <button className="ProfileButton">{props.name}</button>
            </Link>
        </>
    );
}

export default ProfileButton;