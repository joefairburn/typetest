import React, {Component} from 'react';
import { ResponsiveLine } from '@nivo/line';

class Profile extends Component {
	graphData = [];
	
	componentWillMount = () => {
		this.graphData = JSON.parse(localStorage.getItem("historyWPM"));
		let historyLength = this.graphData[0].data.length;
        this.graphData[0].data = this.graphData[0].data.slice(historyLength - 20, historyLength);
	}
	render() {
		return(
		<section className="section-container">
			<header className="section-title">User: <strong>Joe Fairburn</strong></header>
			<div className="bottom-right graph">
				<ResponsiveLine
				data={this.graphData}
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
		</section>
		)
	};
}
export default Profile;