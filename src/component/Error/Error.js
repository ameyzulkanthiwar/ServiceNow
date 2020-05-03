import React from "react";
import "./Error.css";

function Error(props) {
    return (
        <div className={props.className ? props.className : "Error"}>
            <div className="error-text">{props.errorText ? props.errorText : "Ooops! Error!!"}</div>
        </div>
    );
}

export default Error;
