import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [advices, setAdvices] = useState([]);
  const [advicesId, setAdvicesId] = useState([]);
  const [loadAdvice, setLoadAdvice] = useState(false);
  const [advicesIndex, setAdvicesIndex] = useState(0);
  const [error, setError] = useState("");
  const advicesLimit = 5;

  const fetchAdvice = () => {
    if (advices.length < 5) {
      axios
        .get("https://api.adviceslip.com/advice")
        .then((response) => {
          const { advice, id } = response.data.slip;
          setAdvicesId([...advicesId, id]);
          setAdvices([...advices, advice]);
          setAdvicesIndex(advices.length + 1);
          console.log("fetch complet");
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

  useEffect(
    () => fetchAdvice(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => hideError(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error]
  );

  const handleClick = () => {
    setLoadAdvice(true);
    setTimeout(() => {
      fetchAdvice();
    }, 1000);
    setTimeout(() => {
      setLoadAdvice(false);
    }, 1100);
  };

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
        {/* prev btn */}
        {advicesIndex < 2 || (
          <button className="prev-btn" onClick={previousAdvice}>
            {"<"}
          </button>
        )}
        {/* next btn */}
        {advices.length === advicesIndex || (
          <button className="next-btn" onClick={nextAdvice}>
            {">"}
          </button>
        )}
      </div>

      <div className="buttons">
        <button
          className={advices.length < advicesLimit ? "button" : "button limits"}
          onClick={handleClick}
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
