import React from "react";
const Averages = (props) => {
  const listAverages = props.averageScores.map((time, index) => (
    <li className="item-time" key={index}>
      {time.y}
      <span className="wpm-average">WPM</span>
    </li>
  ));
  return (
    <section className="average-list">
      <h4 className="average-title">Last 5 runs</h4>
      <ul>
        {listAverages}
        <hr />
        <li className="item-time">
          <em>Average: </em>
          {props.averageScore} <span className="wpm-average">WPM</span>
        </li>
      </ul>
    </section>
  );
};

export default Averages;
