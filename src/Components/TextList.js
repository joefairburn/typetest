import React from 'react';

const TextList = (props) => {
	return(
		<div>
			<p>{props.text.join(' ')}</p>
		</div>
		);
}

export default TextList;