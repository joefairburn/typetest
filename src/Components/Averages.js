import React from 'react';
import '../Styles/Averages.css';
const Averages = (props) => {
	
	const listAverages = props.averages.map((time, index) =>
		<li className='item-time' key={index}>{time.y} {console.log(time.y)}<span className='wpm-average'>WPM</span></li>	
					
	);
	return(
	<div className='average-list'>
		<h4 className=''>Last 5 runs</h4>
		<ul>{listAverages}
			<hr />
			<li className='item-time'><em>Average: </em>{props.averageScore} <span className='wpm-average'>WPM</span></li></ul>
  </div>
	);
}

export default Averages;