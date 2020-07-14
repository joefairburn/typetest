import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
import pencilIcon from "../Images/pencil-alt-solid.svg";
import Averages from "./Averages.js";

class Profile extends Component {
  historyWPM = {};

  state = {
    userName: "",
    isEditing: false,
    size: 1,
  };

  componentWillMount = () => {
    if (localStorage.getItem("historyWPM")) {
      this.historyWPM = JSON.parse(localStorage.getItem("historyWPM"));
    } else {
      this.historyWPM = [
        { id: "WPM", color: "hsl(238, 70%, 50%)", data: [{ x: "0", y: "0" }] },
      ]; //temporary graph data incase the user hasn't played yet
    }

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

    let averageArray = [];
    for (let i = 0; i < averageScores.length; i++) {
      averageArray.push(averageScores[i].y);
    }

    let average =
      averageArray.reduce((a, b) => parseInt(a) + parseInt(b), 0) /
      averageScoreLength; //calculate average

    //set averages
    this.setState({
      averageScores: averageScores,
      averageScore: Math.round(average),
    });

    //limit graph to 20 results
    let historyLength = this.historyWPM[0].data.length;
    this.historyWPM[0].data = this.historyWPM[0].data.slice(
      historyLength - 25,
      historyLength
    );

    if (!localStorage.getItem("userData")) {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: "User",
        })
      );
    } else {
      let parsedUserData = JSON.parse(localStorage.getItem("userData"));
      this.setState({
        userName: parsedUserData.name,
        size: parsedUserData.length,
      });
    }
  };

  componentDidMount = () => {};

  NameChange = (e) => {
    if (e.target.value.length < 15) {
      this.setState({
        userName: e.target.value,
        size: e.target.value.length,
      });
    }
  };

  NameClick = () => {
    this.setState(
      {
        isEditing: true,
      },
      () => {
        document.getElementById("edit-name").focus();
      }
    );
  };

  nameLostFocus = () => {
    this.setState({
      isEditing: false,
    });
    let newUserData = JSON.parse(localStorage.getItem("userData"));
    newUserData.name = this.state.userName;
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

  handleKeyPressed = (e) => {
    //submit name
    if (e.key === "Enter") {
      this.nameLostFocus();
    }
  };

  render() {
    return (
      <main className="section-container">
        <header className="section-title">
          Name:{" "}
          <span onClick={this.NameClick}>
            {this.state.isEditing ? (
              <input
                autoComplete="off"
                onBlur={this.nameLostFocus}
                onKeyPress={this.handleKeyPressed}
                size={this.state.size}
                id="edit-name"
                className="input-name"
                type="text"
                onChange={this.NameChange}
                value={this.state.userName}
              />
            ) : (
              <strong>{this.state.userName}</strong>
            )}{" "}
            <img
              src={pencilIcon}
              alt="pencil icon"
              height={"20px"}
              className={"pencil-icon hidden-" + this.state.isEditing}
            />
          </span>
        </header>
        <section className="profile-stats">
          <Averages
            averageScores={this.state.averageScores}
            averageScore={this.state.averageScore}
          />

          <figure className="bottom-right graph">
            <ResponsiveLine
              data={this.historyWPM}
              margin={{
                top: 50,
                right: 110,
                bottom: 50,
                left: 60,
              }}
              xScale={{
                type: "point",
              }}
              yScale={{
                type: "linear",
                stacked: true,
                min: 0,
                max: "auto",
              }}
              axisBottom={null}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Word per Minute",
                legendOffset: -40,
                legendPosition: "middle",
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
          </figure>
        </section>
      </main>
    );
  }
}
export default Profile;
