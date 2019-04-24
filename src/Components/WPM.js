import React from "react";

const WPM = props => {
  const checkStart = () => {
    if (props.wordsPerMinute > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="text-wpm">
      {checkStart() ? (
        <p>
          {props.wordsPerMinute} <span className="literal-wpm">wpm</span>
        </p>
      ) : (
        <p>
          0 <span className="literal-wpm">WPM</span>
        </p>
      )}
    </div>
  );
};
export default WPM;
