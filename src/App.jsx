import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [advices, setAdvices] = useState([]);
  const [loadAdvice, setLoadAdvice] = useState(false);
  const [advicesIndex, setAdvicesIndex] = useState(0);
  const [error, setError] = useState("");
  const advicesLimit = 5;

  const fetchAdvice = () => {
    if (advices.length < 5) {
      setLoadAdvice(true);
      axios
        .get("https://api.adviceslip.com/advice")
        .then((response) => {
          const { advice } = response.data.slip;
          setLoadAdvice(false);
          setAdvices([...advices, advice]);
          setAdvicesIndex(advicesIndex + 1);
          console.log(advices);
        })
        .catch((error) => {
          console.log(error);
          setError("ERROR! Try again later...");
        });
    } else {
      setError(["You have reached your limit. Come back tomorrow!"]);
    }
  };

  const hideError = () => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const previousAdvice = () => {
    if (advices.length < 6) {
      setAdvicesIndex(advicesIndex - 1);
    }
    if (advicesIndex <= 1) {
      setAdvicesIndex(1);
    }
  };

  const nextAdvice = () => {
    if (advicesIndex < advices.length) {
      setAdvicesIndex(advicesIndex + 1);
    }
    if (advicesIndex > advices.length) {
      setAdvicesIndex(advices.length);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    hideError();
  }, [error]);

  return (
    <div className="app">
      <div className="card-header">
      <p className={"indicator"}>Limited to {advicesLimit}</p>
      <p className={"indicator"}>
        {advicesIndex} / {advices.length}
      </p>
      </div>
      <div className={"card"}>
        <h1 className="header">
          {loadAdvice ? "thinking ..." : advices[advicesIndex - 1]}
        </h1>
        <button className="prev-btn" onClick={previousAdvice}>
          {"<"}
        </button>
        <button className="next-btn" onClick={nextAdvice}>
          {">"}
        </button>
      </div>

      <div className="buttons">
        <button
          className={advices.length < advicesLimit ? "button" : "button limits"}
          onClick={fetchAdvice}
        >
          <span>
            {advices.length < advicesLimit ? "I need advice" : "No more advice"}
          </span>
        </button>
        <button className="button save">
          <span>Save to notion</span>
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
