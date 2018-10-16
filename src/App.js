import React, { Component } from 'react';
import './App.css';
import TextList from './Components/TextList.js';

class App extends Component {
	state = {
		textBox: '',
		textToType: ['this', 'is', 'a', 'test'],
		pointer: 0,
		found: false,
		currentlyCorrect: -1
	};
	
	//when text is input into textbox
	textChangeHandler = (event) => {
		const pointer = this.state.pointer;
		const textBox = event.target.value;
		const word = this.state.textToType[pointer];
		let found = word.indexOf(textBox);
		this.setState({
			textBox: event.target.value, //set textbox to value entered in textbox, syncing textbox w/ state
			currentlyCorrect: found
		});
		
		//when space + text previously found
		if (textBox.split('')[word.length] === ' ' && this.state.found === true) {
			this.setState({
				pointer: pointer + 1, //increment counter
				textBox: '' //reset text box
			});
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
      <div className='text-center'>
				<TextList text = {this.state.textToType} textLength = {this.state.textBox.length} 
					found = {this.state.found} pointer = {this.state.pointer} 
					currentlyCorrect = {this.state.currentlyCorrect} />
				<input className = 'textInput' value = {this.state.textBox} onChange = {(event) => this.textChangeHandler(event)} />
				
      </div>
    );
  }
}

export default App;
