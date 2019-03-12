import React from 'react';
import '../Styles/EndScreen.css';
import Averages from'./Averages.js';
import { ResponsiveLine } from '@nivo/line';

const EndScreen = (props) => {
	return(
		<div className={'end-screen hide-' + props.hide}>
			<div className='heading-wpm'>
				<h1 className='h1-wpm'>{props.wpm}</h1>
				<p className='heading-5-wpm'>Words per Minute</p>
				<button id="continue-button" 
				className='continue' onClick={props.startGame}>Start Again</button>
			</div>
			<Averages averageScores = {props.averageScores} averageScore = {props.averageScore} />
			<p className='topScore-text'>Highest WPM: <em className='topScore-end'>{props.topScore}</em></p>
			<div className="bottom-right graph">
				<ResponsiveLine
			data={props.graphData}
			margin={{
				"top": 50,
				"right": 110,
				"bottom": 50,
				"left": 60
			}}
			xScale={{
				"type": "point"
			}}
			yScale={{
				"type": "linear",
				"stacked": true,
				"min": "auto",
				"max": "auto"
			}}
			axisBottom={null}
			axisLeft={{
				"orient": "left",
				"tickSize": 5,
				"tickPadding": 5,
				"tickRotation": 0,
				"legend": "Word per Minute",
				"legendOffset": -40,
				"legendPosition": "middle"
			}}
			dotSize={10}
			dotColor="inherit:darker(0.3)"
			dotBorderWidth={2}
			dotBorderColor="#ffffff"
			enableDotLabel={true}
			dotLabel="y"
			dotLabelYOffset={-12}
			animate={true}
			motionStiffness={90}
			motionDamping={15}
		/>
		</div>
	</div>
	);
}
export default EndScreen;