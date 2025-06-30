import React from "react";
import MainContainer from "./components/MainContainer";
import History from "./components/History";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";

function App() {
  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <History />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MainContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
