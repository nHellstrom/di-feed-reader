import React from "react";
import "./App.css";
import { RssReader } from "./RssReader/RssReader";
import roosterLogo from "./rooster.svg";

function App() {
  return (
    <>
      <div className="App__header">
        <img src={roosterLogo} height={"100%"} alt="Niklas logo"/>
        <h1 className="App__title">Nyhetsflöde - Dagens Industri</h1>
      </div>
      <div className="App__body">
        <RssReader />
        <p>av Niklas Hellström</p>
      </div>
    </>
  );
}

export default App;
