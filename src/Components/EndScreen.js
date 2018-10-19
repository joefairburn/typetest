import React from 'react'
import '../Styles/EndScreen.css';
import Averages from'./Averages.js';
const EndScreen = (props) => {
	return(
		<div className={'end-screen hide-' + props.hide}>
			<div className='heading-wpm'>
				<h1 className='h1-wpm'>{props.wpm}</h1>
				<p className='heading-5-wpm'>Words per Minute</p>
				<button id="continue-button" className='continue' onClick={props.startGame}>Start Again</button>
			</div>
			<Averages averages = {props.averageScores} averageScore = {props.averageScore} />
		</div>
		
	);
}
export default EndScreen;