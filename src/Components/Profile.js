import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
import pencilIcon from "../Images/pencil-alt-solid.svg";

class Profile extends Component {
  graphData = [];

  state = {
    userName: "",
    isEditing: false,
    size: 1
  };

  componentWillMount = () => {
    this.graphData = JSON.parse(localStorage.getItem("historyWPM"));
    let historyLength = this.graphData[0].data.length;
    this.graphData[0].data = this.graphData[0].data.slice(
      historyLength - 20,
      historyLength
    );
    if (!localStorage.getItem("userData")) {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: "Joe"
        })
      );
    } else {
      let parsedUserData = JSON.parse(localStorage.getItem("userData"));
      this.setState({
        userName: parsedUserData.name,
        size: parsedUserData.length
      });
    }
  };

  NameChange = e => {
    this.setState({
      userName: e.target.value,
      size: e.target.value.size
    });
  };

  NameClick = () => {
    this.setState(
      {
        isEditing: true
      },
      () => {
        document.getElementById("edit-name").focus();
      }
    );
  };

  nameLostFocus = () => {
    this.setState({
      isEditing: false
    });
    let newUserData = JSON.parse(localStorage.getItem("userData"));
    newUserData.name = this.state.userName;
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

  handleKeyPressed = e => {
    if (e.key === "Enter") {
      this.nameLostFocus();
    }
  };

  render() {
    return (
      <section className="section-container">
        <header className="section-title">
          User:{" "}
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
        <div className="bottom-right graph">
          <ResponsiveLine
            data={this.graphData}
            margin={{
              top: 50,
              right: 110,
              bottom: 50,
              left: 60
            }}
            xScale={{
              type: "point"
            }}
            yScale={{
              type: "linear",
              stacked: true,
              min: 0,
              max: "auto"
            }}
            axisBottom={null}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Word per Minute",
              legendOffset: -40,
              legendPosition: "middle"
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
    );
  }
}
export default Profile;
