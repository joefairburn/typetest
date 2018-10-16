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
	
	const listItems = props.text.map((word, index) =>
		<div className='words'>
		{currentWord(index) ? <span key={index} className='text-highlight'>{word}</span> : <span>{word}</span> }
		&#160;
		</div>);
	
	return(
		<div className="list">
			{listItems}
		</div>
		);
}

export default TextList;