import React from 'react';

const WPM = (props) => {
	const checkStart = () => {
		if(props.wordsPerMinute > 0) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div className="text-wpm">
			{checkStart() ? <div>{props.wordsPerMinute} <span className='literal-wpm'>wpm</span></div> : <div>0 <span className='literal-wpm'>WPM</span></div>}
		</div>
	);
}
export default WPM;