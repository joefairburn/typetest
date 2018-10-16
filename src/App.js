import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		textBox: '',
		textToType: ['this', 'is', 'a', 'test']
	};

	textChangeHandler = (event) => {
		this.setState({ textBox: event.target.value });
	}
	
  render() {
    return (
      <div>
				<input value = {this.state.textBox} onChange = {(event) => this.textChangeHandler(event)} />
				
      </div>
    );
  }
}

export default App;
