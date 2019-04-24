import React from "react";

const EndScreen = props => {
  return (
    <div className={"end-screen hide-" + props.hide}>
      <section className="heading-wpm">
        <h1 className="h1-wpm">{props.wpm}</h1>
        <p className="heading-5-wpm">Words per Minute</p>
        <button
          id="continue-button"
          className="button continue"
          onClick={props.startGame}
        >
          Start Again
        </button>
      </section>
      <p className="topScore-text">
        Highest WPM: <em className="topScore-end">{props.topScore}</em>
      </p>
    </div>
  );
};
export default EndScreen;
