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
			{checkStart() ? <div>{props.wordsPerMinute} WPM</div> : <div>0 WPM</div>}
		</div>
	);
}
export default WPM;