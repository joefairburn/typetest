import React from 'react'
import '../Styles/EndScreen.css';
const EndScreen = (props) => {
	return(
		<div className={'end-screen hide-' + props.hide}>
			<div className='heading-wpm'>
				<h1 className='h1-wpm'>{props.wpm}</h1>
				<p className='heading-5-wpm'>Words per Minute</p>
				<button id="continue-button" className='continue' onClick={props.startGame}>Start Again</button>
			</div>
		</div>
		
	);
}
export default EndScreen;