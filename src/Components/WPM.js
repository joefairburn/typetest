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
			{checkStart() ? <div>{props.wordsPerMinute} WPM</div> : <div>Type to start</div>}
		</div>
	);
}
export default WPM;