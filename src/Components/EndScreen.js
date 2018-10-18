import React from 'react'
import '../Styles/EndScreen.css';
const EndScreen = (props) => {
	return(
		<div className={'end-screen hide-' + props.hide}>
			<div className='heading-wpm'>
				<h1 className='h1-wpm'>{props.wpm}</h1>
				<p className='heading-5-wpm'>Words per Minute</p>
				<p className='continue'>Press any key to go again</p>
			</div>
		</div>
		
	);
}
export default EndScreen;