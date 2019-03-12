import React from "react";
import "../Styles/Reset.css";
const Reset = props => {
  return (
    <button className="reset-button" onClick={props.reset}>
      Reset
    </button>
  );
};

export default Reset;
