import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = { advice: "" };

  componentDidMount() {
    this.setState({ advice: "thinking ..." });
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios
      .get("	https://api.adviceslip.com/advice")
      .then(
        this.setState({advice:"thinking ..."})
      )
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          advice: "ERROR ! try again later ...",
        });
      });
  };

  render() {
    const { advice } = this.state;
    return (
      <div className="app">
        <div className="card">
          <h1 className="header">{advice}</h1>
        </div>
          <div className="buttons">
            <button className="button" onClick={this.fetchAdvice}>
              <span>I NEED AN ADVICE !</span>
            </button>
            <button className="button save">
              <span>save this</span>
            </button>
          </div>
      </div>
    );
  }
}

export default App;
