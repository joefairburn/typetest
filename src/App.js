import React, { Component } from 'react';
import './Styles/App.css';
import TextList from './Components/TextList.js';
import Navbar from './Components/Navbar.js';
import WPM from './Components/WPM.js';
import Reset from'./Components/Reset.js';
import axios from 'axios';

class App extends Component {
	x = "";
	timer;
	totalLetters = 0;
	state = {
		textBox: '',
		textToType: this.x.split(' '),
		pointer: 0,
		found: false,
		currentlyCorrect: -1,
		currentWPM: 0,
		author: '',
		placeholder: 'Type the text above'
	};
	
	tickSecond() {
		let newTime = new Date();
		newTime = newTime.getTime();
		const words = this.totalLetters / 5;
		const seconds = (newTime - this.timer)/1000;
		const minutes = seconds/60;
		const WPM = Math.floor(words/minutes); //use either words or pointer
		this.setState({currentWPM: WPM});
	}

	resetApp = () => {
		this.getQuote();
		document.getElementById("inputText").focus();
		this.totalLetters = 0;
		this.timer = 0;
		this.setState({
			pointer: 0,
			currentWPM: 0,
			textBox: '',
			found: false,
			placeholder: 'Type the text above',
			author: '',
			textToType: ['']
			
		});
	}
	
	saveScore = () => {
		
	}

	getQuote = () => {
		axios.get('https://talaikis.com/api/quotes/random/')
		.then(response => {
			this.x = response.data.quote;
			if(this.x.length > 110) {
			this.getQuote();
			} else {
				this.setState({ 
					textToType: this.x.split(' '),
					author: response.data.author
				});
			}
			console.log(response.data.author);
		});
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tickSecond(), 1000);
		this.getQuote();
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	
	//when text is input into textbox
	textChangeHandler = (event) => {
		let pointer = this.state.pointer;
		const word = this.state.textToType[pointer];
		let textBox = event.target.value;
		let found = word.indexOf(textBox);
		if(textBox === ' ') textBox = '';
		this.setState({
			textBox: textBox, //set textbox to value entered in textbox, syncing textbox w/ state
			currentlyCorrect: found
		});

		if(textBox.length === 1 && pointer === 0) {
			const currentTime = new Date();
			this.timer = currentTime.getTime();
			this.setState({placeholder: ''});
		}
		//when space + text previously found
		if (textBox.split('')[word.length] === ' ' && this.state.found === true) {
			this.totalLetters += word.length + 1;// +1 for space
			console.log(pointer + ' ' + this.state.textToType.length)
			pointer+=1;
			this.setState({
				pointer: pointer, //increment counter
				textBox: '', //reset text box
			});
		}
		if(pointer >= this.state.textToType.length) {
			pointer = -1;
			// DO SOMETHING HERE
			this.resetApp();
		}
		//set found to true or false for next iteration
		if (found === 0 && textBox.length === word.length) { // check from the start of the word
			this.setState({
				found: true
			});
		}
		else {
			this.setState({
				found: false
			});
		}
	}
	
  render() {
    return (
			<div>
				<Navbar />
				<div className='text-center content'>
					<TextList totalLength = {this.x.length} text = {this.state.textToType} textLength = {this.state.textBox.length} 
						found = {this.state.found} pointer = {this.state.pointer} 
						currentlyCorrect = {this.state.currentlyCorrect} author = {this.state.author} />
					<input id= 'inputText' className = 'textInput' value = {this.state.textBox} onChange = {(event) => this.textChangeHandler(event)} autoFocus={true} maxLength = '22' placeholder={this.state.placeholder}/>
					<Reset reset = {this.resetApp} />
					<WPM wordsPerMinute = {this.state.currentWPM} textBoxLength = {this.state.textBox.length} />
				</div>
			</div>
    );
  }
}

export default App;