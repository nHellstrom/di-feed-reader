import React from "react";
import "./App.css";
import { RssReader } from "./RssReader/RssReader";
import roosterLogo from "./rooster.svg";

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <img src={roosterLogo} height={"100%"}/>
        <h1 className="App__title">Nyhetsflöde - Dagens Industri</h1>
      </header>
      <div className="App__body">
        <RssReader />
      </div>
    </div>
  );
}

export default App;
