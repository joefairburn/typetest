import React, { Component } from "react";
import "./Styles/App.css";
import TextList from "./Components/TextList.js";
import Navbar from "./Components/Navbar.js";
import WPM from "./Components/WPM.js";
import Reset from "./Components/Reset.js";
import EndScreen from "./Components/EndScreen.js";
import axios from "axios";

class App extends Component {
  x = "";
  quotes = [];
  timer;
  totalLetters = 0;
  finalWPM = 0;
  averageCount = 0;
  historyWPM = [{
    "id": "WPM",
    "color": "hsl(238, 70%, 50%)",
    "data": []
    }];
  state = {
    textBox: "",
    textToType: this.x.split(" "),
    pointer: 0,
    found: false,
    currentlyCorrect: -1,
    currentWPM: 0,
    author: "",
    placeholder: "Type the text above",
    hideMain: false,
    hideEndScreen: true,
    countdown: 0,
    averageScores: [],
    topScore: 0,
    averageScore: 0,
    incorrect: false
  };

  changeWPM = () => {
    let newTime = new Date();
    newTime = newTime.getTime();
    const words = this.totalLetters / 5;
    const seconds = (newTime - this.timer) / 1000;
    const minutes = seconds / 60;
    const WPM = Math.floor(words / minutes); //use either words or pointer
    this.setState({
      currentWPM: WPM
    });
    console.log(this.historyWPM[0].data);
  }

  resetApp = () => {
    this.changeQuote();
    clearInterval(this.countdownInterval);
    this.totalLetters = 0;
    this.timer = 0;
    this.setState({
      pointer: 0,
      currentWPM: 0,
      textBox: "",
      found: false,
      placeholder: "Type the text above",
      author: "",
      textToType: [""],
      countdown: 1
    });
    //this.countdownInterval = setInterval(() => this.countdown(), 1000);
  };

  startGame = () => {
    if (this.state.hideMain === true && this.state.hideEndScreen === false) {
      this.setState({
        hideMain: false,
        hideEndScreen: true
      });
      this.resetApp();
    }
  };

  changeQuote = () => {
    axios.get("https://favqs.com/api/qotd").then(response => {
      this.x = response.data.quote.body;
      if (this.x.length > 140 || this.x.length < 90) {
        this.changeQuote();
        return;
      } else {
        this.setState({
          textToType: this.x.split(" "),
          // textToType: ["test", "test"],
          author: "- " + response.data.quote.author
        });
        this.setState({
          countdown: 0
        });
        this.quotes.push({ "id": this.quotes.length, "qotd_id": response.data.quote.id, "quote": response.data.quote.body, "author": response.data.quote.author});
        localStorage.setItem("quotes", JSON.stringify(this.quotes));
        console.log(this.quotes);
      }
      document.getElementById("inputText").focus();
    })
    //handle error so application doesn't crash
    .catch(function (error) {
      // print error to console
      console.log(error);
    });
  };

  // countdown = () => {
  //   if (this.state.countdown !== 0) {
  //     this.setState({
  //       countdown: this.state.countdown - 1
  //     });
  //   } else {
  //     clearInterval(this.countdownInterval);
  //   }
  // };

  componentDidMount() {
    this.interval = setInterval(() => this.changeWPM(), 1000);
    this.changeQuote();
    this.setState({
      countdown: 1
    });
    this.setState({
       topScore: localStorage.getItem("topScore")
    });

    if (localStorage.getItem("historyWPM")) {
      this.historyWPM = JSON.parse(localStorage.getItem("historyWPM"));
    }

    if (localStorage.getItem("quotes")) {
      this.quotes = JSON.parse(localStorage.getItem("quotes"));
    }
    console.log(this.historyWPM[0].data);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  mistakeMade = () => {
    if((this.state.currentlyCorrect === 0 || this.state.textBox.length === 0)) {
      return false;
    }
    else {
      return true;
    }
  };

  //when text is input into textbox
  textChangeHandler = event => {
    let pointer = this.state.pointer;
    const word = this.state.textToType[pointer];
    let textBox = event.target.value;
    let found = word.indexOf(textBox);
    if (textBox === " ") textBox = "";
    if (this.state.countdown === 0) {
      this.setState({
        textBox: textBox, //set textbox to value entered in textbox, syncing textbox w/ state
        currentlyCorrect: found
      });
    }

    if (textBox.length === 1 && pointer === 0) {
      const currentTime = new Date();
      this.timer = currentTime.getTime();
    }
    //when space + text previously found
    if (textBox.split("")[word.length] === " " && this.state.found === true) {
      this.totalLetters += word.length + 1; // +1 for space
      pointer += 1;
      this.setState({
        pointer: pointer, //increment counter
        textBox: "", //reset text box
        placeholder: ""
      });
    }
    
    //set found to true or false for next iteration
    if (found === 0 && textBox.length === word.length) {
      // check from the start of the word
      this.setState({
        found: true
      });
      if (pointer === this.state.textToType.length - 1) {
        this.changeWPM();
        this.finalWPM = this.state.currentWPM;
        this.historyWPM[0].data.push({ "x": this.historyWPM[0].data.length.toString(), "y": this.finalWPM});
        console.log(this.historyWPM);
        let averageScoreLength = this.historyWPM[0].data.length;
        if (this.historyWPM[0].data.length > 5) {
          averageScoreLength = 5;
        }
        let averageScores = this.historyWPM[0].data.slice(
          this.historyWPM[0].data.length - averageScoreLength,
          this.historyWPM[0].data.length
        );
        if (averageScores.length < 5) {
          averageScoreLength = averageScores.length;
        } else {
          averageScoreLength = 5;
        }
        console.log(averageScores);

        //new top score
        if (this.state.topScore < this.finalWPM) {
          this.setState({
            topScore: this.finalWPM
          });
          localStorage.setItem("topScore", this.finalWPM);
        }
        console.log(averageScores);
        
        let averageArray = [];
        for(let i = 0; i < averageScores.length; i++) {
          averageArray.push(averageScores[i].y);
        }

        let average =
          averageArray.reduce((a, b) => parseInt(a) + parseInt(b), 0) /
          averageScoreLength; //calculate average
        // // DO SOMETHING HERE END
        this.setState({
          hideMain: true,
          hideEndScreen: false,
          averageScores: averageScores,
          averageScore: Math.round(average)
        });
        localStorage.setItem("historyWPM", JSON.stringify(this.historyWPM));
        console.log(localStorage.getItem("historyWPM"));
      }
    } else {
      this.setState({
        found: false
      });
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <EndScreen
          hide={this.state.hideEndScreen}
          wpm={this.finalWPM}
          startGame={this.startGame}
          graphData={this.historyWPM}
          averageScores={this.state.averageScores}
          averageScore={this.state.averageScore}
          topScore={this.state.topScore}
        />{" "}
        <div className={"text-center content hide-" + this.state.hideMain}>
          <TextList
            totalLength={this.x.length}
            text={this.state.textToType}
            textLength={this.state.textBox.length}
            found={this.state.found}
            pointer={this.state.pointer}
            currentlyCorrect={this.state.currentlyCorrect}
            author={this.state.author}
          />{" "}
          <input
            id="inputText"
            className={"textInput mistake-" + this.mistakeMade()}
            value={this.state.textBox}
            onChange={event => this.textChangeHandler(event)}
            autoFocus={true}
            maxLength="22"
            placeholder={this.state.placeholder}
            autoComplete="off"
          />{" "}
          <Reset reset={this.resetApp} />{" "}
          <WPM
            wordsPerMinute={this.state.currentWPM}
            textBoxLength={this.state.textBox.length}
          />{" "}
        </div>
      </div>
    );
  }
}

export default App;


