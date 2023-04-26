import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [advices, setAdvices] = useState([]);
  const [loadAdvice, setLoadAdvice] = useState(false);
  const [numberOfAdvices, setNumberOfAdvices] = useState(0);
  const [advicesIndex, setAdvicesIndex] = useState(-1);
  const [error, setError] = useState("");

  const fetchAdvice = () => {
    if (numberOfAdvices < 5) {
      setLoadAdvice(true);
      axios
        .get("https://api.adviceslip.com/advice")
        .then((response) => {
          const { advice } = response.data.slip;
          setAdvices([...advices, advice]);
          setNumberOfAdvices(numberOfAdvices + 1);
          setAdvicesIndex(advicesIndex + 1);
          setLoadAdvice(false);
          console.log(advices[advicesIndex]);
        })
        .catch((error) => {
          console.log(error);
          setError("ERROR! Try again later...");
        });
    } else {
      setAdvices(["You have reached your limit. Come back tomorrow!"]);
      setAdvicesIndex(0);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="app">
      <p className={numberOfAdvices < 5 ? "indicator" : "indicator limits"}>
        {numberOfAdvices} / 5
      </p>
      <div className={numberOfAdvices < 6 ? "card" : "card limits"}>
        <h1 className="header">
          {loadAdvice ? "thinking ..." : advices[advicesIndex]}
        </h1>
      </div>
      <div className="buttons">
        <button
          className={numberOfAdvices < 5 ? "button" : "button limits"}
          onClick={fetchAdvice}
        >
          <span>
            {numberOfAdvices < 5 ? "I need advice" : "No more advice"}
          </span>
        </button>
        <button className="button save">
          <span>Save this</span>
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
