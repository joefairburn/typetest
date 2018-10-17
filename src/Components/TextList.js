import React from 'react';

const TextList = (props) => {
	
	const currentWord = (index) => {
		if (props.pointer === index) {
			return true;
		}
		else {
			return false;
		}
	}
	
	const currentlyCorrect = () => {
		if (props.currentlyCorrect === 0 || props.textLength === 0) {
			return true;
		} else {
			return false;
		}
	}
	
	const lengthBiggerThanZero = (text) => {
		if(text > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	const wasCorrect = (index) => {
		if(index < props.pointer) {
			return true;
		}
	}
	
	const listItems = props.text.map((word, index) =>
		<span className='words' key={index}>
			{(currentWord(index) && currentlyCorrect()) ? <span><span className='words text-current'><span className='text-correct'>{word.substring(0, props.textLength)}</span><span>{word.substring(props.textLength, props.text.length)}</span></span>&nbsp;</span>
		: currentWord(index) && !currentlyCorrect() && lengthBiggerThanZero(props.textLength) ? <span className='text-incorrect'>{word} </span> : wasCorrect(index) ? <span className='text-correct'>{word} </span> : <span>{word} </span>}
		</span>);
	
	return(
		<p className="list">
			{listItems}
		</p>
		);
}

export default TextList;