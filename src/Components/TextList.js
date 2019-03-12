import React from "react";

const TextList = props => {
  let fontSize = "32px";
  const currentWord = index => {
    if (props.pointer === index) {
      return true;
    } else {
      return false;
    }
  };

  const currentlyCorrect = () => {
    console.log(props.currentlyCorrect);
    if (props.currentlyCorrect === 0 || props.textLength === 0) {
      return true;
    } else {
      return false;
    }
  };

  const lengthBiggerThanZero = text => {
    if (text > 0) {
      return true;
    } else {
      return false;
    }
  };

  const wasCorrect = index => {
    if (index < props.pointer) {
      return true;
    }
  };
  // console.log(props.totalLength);
  if (props.totalLength < 80) {
    fontSize = "42px";
  } else if (props.totalLength < 100) {
    fontSize = "38px";
  } else if (props.totalLength < 120) {
    fontSize = "32px";
  } else if (props.totalLength <= 150) {
    fontSize = "30px";
  } else {
    fontSize = "24px";
  }

  const listStyle = {
    fontSize: fontSize
  };

  const listItems = props.text.map((word, index) => (
    <span className="words" key={index}>
      {currentWord(index) && currentlyCorrect() ? (
        <span>
          <span className="text-current">
            <span className="text-correct">
              {word.substring(0, props.textLength)}
            </span>
            <span>{word.substring(props.textLength)}</span>
          </span>{" "}
        </span>
      ) : currentWord(index) &&
        !currentlyCorrect() &&
        lengthBiggerThanZero(props.textLength) ? (
        <span>
          <span className="text-incorrect">{word}</span>{" "}
        </span>
      ) : wasCorrect(index) ? (
        <span className="text-correct">{word} </span>
      ) : (
        <span>{word} </span>
      )}
    </span>
  ));

  return (
    <div className="quote">
      <p className="list" style={listStyle}>
        {listItems}
      </p>
      <p className="author"> {props.author}</p>
      <br />
    </div>
  );
};

export default TextList;
