import React from "react";
import MainContainer from "./components/MainContainer";
import History from "./components/History";

function App() {
  return (
    <div className="grid grid-cols-5 h-screen bg-zinc-900 text-white">
      <History />
      <MainContainer />
    </div>
  );
}

export default App;
