import React from "react";
import "../Styles/Countdown.css";

const Countdown = props => {
  let hidden = false;
  if (props.countdown === 0) {
    hidden = true;
  }
  return (
    <div className={"countdown-div hidden-" + hidden}>
      <h2 className="countdown">{props.countdown}</h2>
    </div>
  );
};

export default Countdown;
