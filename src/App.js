// src/App.js

import React, { useState } from "react";
import BollingerBandsChart from "./components/BollingerBandsChart";
import "./App.css"; // Optional: For global styling
import AverageTrueRange from "./components/AverageTrueRange";
import HistoricalVolatality from "./components/HistoricalVolatality";
import CandleChart from "./components/CandleChart";

function App() {
  const [selectedCoin, setSelectedCoin] = useState("XBT");

  const handleCoinChange = (e) => {
    setSelectedCoin(e.target.value.toUpperCase());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kraken Cryptocurrency Analytics</h1>
      </header>
      <main>
        <div className="coin-selector">
          <label htmlFor="coin">Select Coin: </label>
          <select id="coin" value={selectedCoin} onChange={handleCoinChange}>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
            <option value="XBT">XBT</option>
            {/* Add more coins as needed */}
          </select>
        </div>
        <BollingerBandsChart coin={selectedCoin} />
        <AverageTrueRange coin={selectedCoin} />
        <HistoricalVolatality coin={selectedCoin} />
        <CandleChart coin={selectedCoin} />
      </main>
    </div>
  );
}

export default App;
