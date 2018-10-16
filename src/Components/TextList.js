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
		console.log(props.currentlyCorrect);
		if (props.currentlyCorrect !== -1) {
			return true;
		} else {
			console.log(false);
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
	
	const listItems = props.text.map((word, index) =>
		<p className='words' key={index}>
			{currentWord(index) && currentlyCorrect() ? <p className='words'><span className='text-correct'>{word.substring(0, props.textLength)}</span><span>{word.substring(props.textLength, props.text.length)}</span></p>
		: currentWord(index) && !currentlyCorrect() && lengthBiggerThanZero(props.textLength) ? <span className='text-incorrect'>{word}</span> : <span>{word}</span>}
		&#160;
		</p>);
	
	return(
		<div className="list">
			{listItems}
		</div>
		);
}

export default TextList;