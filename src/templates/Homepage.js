import React, { useEffect, useState } from "react";
import BollingerBandsChart from "../components/BollingerBandsChart";
import AverageTrueRange from "../components/AverageTrueRange";
import HistoricalVolatality from "../components/HistoricalVolatality";
import CandleChart from "../components/CandleChart";
import "./Homepage.css";

const Homepage = ({ coin }) => {
  const [selectedOption, setSelectedOption] = useState(coin || "ETH");

  // Update selectedOption when the coin value changes from outside (via hook or prop)
  useEffect(() => {
    if (coin) {
      setSelectedOption(coin);
    }
  }, [coin]);

  return (
    <div className="homepage">
      {/* Main content divided into two sections */}
      <div className="main-content">
        <div className="section-70">
          <h2>{selectedOption} Data</h2>
          {/* <p>This is the main area for showing the data for {selectedOption}.</p> */}
          <div
            style={{
              height: "100%",
              background: "#ddd",
              width: "90%",
              borderRadius: "12px", // Adding border-radius for rounded corners
              overflow: "hidden", // Ensures the chart content stays inside the rounded corners
              padding: "16px", // Optional padding for visual enhancement
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for a more elevated look
            }}
          >
            <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
              {selectedOption} Bollinger Bands (Real-Time)
            </h2>

            <BollingerBandsChart coin={selectedOption} />
            {/* <h2 style={{ textAlign: "left", marginLeft: "10px" }}>{selectedOption} Average True Range (Real-Time)</h2>

            <AverageTrueRange coin={selectedOption} /> */}
            <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
              {selectedOption} Historical Volatile (Real-Time)
            </h2>

            <HistoricalVolatality coin={selectedOption} />
            <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
              {selectedOption} Candle Chart (Real-Time)
            </h2>

            <CandleChart coin={selectedOption} />
          </div>
        </div>
        <div className="section-30">
          <h2>{selectedOption} Data (30%)</h2>
          <p>
            This is the main area for showing the data for {selectedOption}.
          </p>
          <div style={{ height: "150vh", background: "#ddd", width: "100%" }}>
            <p> used for chatbot</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
