import React, { Component } from "react";
import "../Styles/App.css";
import TextList from "./TextList.js";
import WPM from "./WPM.js";
import Reset from "./Reset.js";
import EndScreen from "./EndScreen.js";
//import axios from "axios";
import quotes from "../quotes.js";

class TypeTest extends Component {
  quote = "";
  quotes = [];
  timer;
  totalLetters = 0;
  finalWPM = 0;
  averageCount = 0;
  historyWPM = [
    {
      id: "WPM",
      color: "hsl(238, 70%, 50%)",
      data: [],
    },
  ];
  graphData = [];
  state = {
    textBox: "",
    textToType: this.quote.split(" "),
    pointer: 0,
    found: false,
    currentlyCorrect: -1,
    currentWPM: 0,
    author: "",
    placeholder: "Type the text above",
    hideMain: false,
    hideEndScreen: true,
    averageScores: [],
    topScore: 0,
    averageScore: 0,
    incorrect: false,
  };

  //Ran every second
  changeWPM = () => {
    let newTime = new Date();
    newTime = newTime.getTime(); //set to current time
    const words = this.totalLetters / 5; //divide by the average number of letters in a word
    const seconds = (newTime - this.timer) / 1000;
    const minutes = seconds / 60;
    const WPM = Math.floor(words / minutes); //use either words or pointer
    //update WPM
    this.setState({
      currentWPM: WPM,
    });
  };

  resetApp = () => {
    //Reset and clear all variables being used
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
    });
    document.getElementById("inputText").focus();
  };

  startGame = () => {
    if (this.state.hideMain === true && this.state.hideEndScreen === false) {
      this.setState(
        {
          hideMain: false,
          hideEndScreen: true,
        },
        //Once main screen is shown the focus goes to the textbox
        () => {
          document.getElementById("inputText").focus();
        }
      );
    }
    this.resetApp();
  };

  changeQuote = () => {
    //Used to get quotes from online rather than locally
    //
    // axios.get("https://favqs.com/api/qotd").then(response => {
    //   console.log(response.data.quote.body);
    //   if (this.x.length > 140 || this.x.length < 90) {
    //   } else {
    //     this.quotes.push({ "id": this.quotes.length, "qotd_id": response.data.quote.id, "quote": response.data.quote.body, "author": response.data.quote.author});
    //     localStorage.setItem("quotes", JSON.stringify(this.quotes));
    //     console.log(this.quotes);
    //   }
    // })
    // //handle error so application doesn't crash
    // .catch(function (error) {
    //   // print error to console
    //   console.log(error);
    // });

    let newQuote = quotes[Math.floor(Math.random() * quotes.length)]; //get random quote
    this.quote = newQuote.quote;
    this.setState({
      textToType: this.quote.split(" "), //split quote into array seperated by a space
      author: "- " + newQuote.author, //set author
    });
  };

  componentDidMount() {
    this.interval = setInterval(() => this.changeWPM(), 1000); //Run change WPM every second
    this.changeQuote(); //new quote
    this.setState({
      topScore: localStorage.getItem("topScore"),
    });

    if (localStorage.getItem("historyWPM")) {
      this.historyWPM = JSON.parse(localStorage.getItem("historyWPM"));
    }

    if (localStorage.getItem("quotes")) {
      this.quotes = JSON.parse(localStorage.getItem("quotes"));
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  mistakeMade = () => {
    //check if word enetered is correct
    if (this.state.currentlyCorrect === 0 || this.state.textBox.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  //when text is input into textbox
  textChangeHandler = (event) => {
    let pointer = this.state.pointer;
    const word = this.state.textToType[pointer];
    let textBox = event.target.value;
    let found = word.indexOf(textBox);
    if (textBox === " ") textBox = "";
    this.setState({
      textBox: textBox, //set textbox to value entered in textbox, syncing textbox w/ state
      currentlyCorrect: found,
    });

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
        placeholder: "",
      });
    }

    //set found to true or false for next iteration
    if (found === 0 && textBox.length === word.length) {
      // check from the start of the word
      this.setState({
        found: true,
      });
      //When paragraph is complete
      if (pointer === this.state.textToType.length - 1) {
        this.changeWPM();
        this.finalWPM = this.state.currentWPM;
        //Add new WPM to the list of previous WPM's
        this.historyWPM[0].data.push({
          x: this.historyWPM[0].data.length.toString(),
          y: this.finalWPM,
        });
        let averageScoreLength = this.historyWPM[0].data.length;
        //Minimum value for averageScoreLength set to 5
        if (this.historyWPM[0].data.length > 5) {
          averageScoreLength = 5;
        }
        //Get the last 5 (or less if length is less) last values
        let averageScores = this.historyWPM[0].data.slice(
          this.historyWPM[0].data.length - averageScoreLength,
          this.historyWPM[0].data.length
        );
        if (averageScores.length < 5) {
          averageScoreLength = averageScores.length;
        } else {
          averageScoreLength = 5;
        }

        //new top score
        if (this.state.topScore < this.finalWPM) {
          this.setState({
            topScore: this.finalWPM,
          });
          localStorage.setItem("topScore", this.finalWPM);
        }

        //put average scores into an array so they can be mapped
        let averageArray = [];
        for (let i = 0; i < averageScores.length; i++) {
          averageArray.push(averageScores[i].y);
        }

        let average =
          averageArray.reduce((a, b) => parseInt(a) + parseInt(b), 0) /
          averageScoreLength; //calculate average

        //show main screen, update average scores state
        this.setState({
          hideMain: true,
          hideEndScreen: false,
          averageScores: averageScores,
          averageScore: Math.round(average),
        });
        localStorage.setItem("historyWPM", JSON.stringify(this.historyWPM)); //set new scores to local storage

        this.graphData = JSON.parse(localStorage.getItem("historyWPM"));
        let historyLength = this.graphData[0].data.length;

        //Limit the data shown in the graph in end screen
        if (historyLength <= 20) {
          this.graphData[0].data = this.graphData[0].data.slice(
            historyLength - historyLength,
            historyLength
          );
        } else {
          this.graphData[0].data = this.graphData[0].data.slice(
            historyLength - 20,
            historyLength
          );
        }
      }
    } else {
      this.setState({
        found: false,
      });
    }
  };

  render() {
    return (
      <main>
        <EndScreen
          hide={this.state.hideEndScreen}
          wpm={this.finalWPM}
          startGame={this.startGame}
          graphData={this.graphData}
          averageScores={this.state.averageScores}
          averageScore={this.state.averageScore}
          topScore={this.state.topScore}
        />{" "}
        <section
          className={
            "typetest-main text-center content hide-" + this.state.hideMain
          }
        >
          <TextList
            totalLength={this.quote.length}
            text={this.state.textToType}
            textLength={this.state.textBox.length}
            found={this.state.found}
            pointer={this.state.pointer}
            currentlyCorrect={this.state.currentlyCorrect}
            author={this.state.author}
          />{" "}
          <div className="lower-container">
            <input
              id="inputText"
              className={"textInput mistake-" + this.mistakeMade()}
              value={this.state.textBox}
              onChange={(event) => this.textChangeHandler(event)}
              autoFocus={true}
              maxLength="22"
              placeholder={this.state.placeholder}
              autoComplete="off"
            />{" "}
            <Reset reset={this.resetApp} />
          </div>
          <WPM
            wordsPerMinute={this.state.currentWPM}
            textBoxLength={this.state.textBox.length}
          />{" "}
        </section>
      </main>
    );
  }
}
export default TypeTest;
