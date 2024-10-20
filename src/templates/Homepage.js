// import React, { useEffect, useState } from "react";
// import BollingerBandsChart from "../components/BollingerBandsChart";
// import AverageTrueRange from "../components/AverageTrueRange";
// import HistoricalVolatality from "../components/HistoricalVolatality";
// import CandleChart from "../components/CandleChart";
import ChatAssistant from "../components/ChatAssistant";
// import "./Homepage.css";

// const Homepage = ({ coin }) => {
//   const [selectedOption, setSelectedOption] = useState(coin || "ETH");

//   // Update selectedOption when the coin value changes from outside (via hook or prop)
//   useEffect(() => {
//     if (coin) {
//       setSelectedOption(coin);
//     }
//   }, [coin]);

//   return (
//     <div className="homepage">
//       {/* Main content divided into two sections */}
//       <div className="main-content">
//         <div className="section-70">
//           <h2>{selectedOption} Data</h2>
//           {/* <p>This is the main area for showing the data for {selectedOption}.</p> */}
//           <div
//             style={{
//               height: "100%",
//               background: "#ddd",
//               width: "90%",
//               borderRadius: "12px", // Adding border-radius for rounded corners
//               overflow: "hidden", // Ensures the chart content stays inside the rounded corners
//               padding: "16px", // Optional padding for visual enhancement
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for a more elevated look
//             }}
//           >
//             <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
//               {selectedOption} Bollinger Bands (Real-Time)
//             </h2>

//             <BollingerBandsChart coin={selectedOption} />
//             {/* <h2 style={{ textAlign: "left", marginLeft: "10px" }}>{selectedOption} Average True Range (Real-Time)</h2>

//             <AverageTrueRange coin={selectedOption} /> */}
//             <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
//               {selectedOption} Historical Volatile (Real-Time)
//             </h2>

//             <HistoricalVolatality coin={selectedOption} />
//             <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
//               {selectedOption} Candle Chart (Real-Time)
//             </h2>

//             <CandleChart coin={selectedOption} />
//           </div>
//         </div>
//         <div className="section-30">
//           <h2>{selectedOption} Data (30%)</h2>
//           <p>
//             This is the main area for showing the data for {selectedOption}.
//           </p>
//           <div style={{ height: "150vh", background: "#ddd", width: "100%" }}>
//             <ChatAssistant/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;

import React, { useEffect, useState } from "react";
import BollingerBandsChart from "../components/BollingerBandsChart";
import AverageTrueRange from "../components/AverageTrueRange";
import HistoricalVolatality from "../components/HistoricalVolatality";
import CandleChart from "../components/CandleChart";
import "./Homepage.css";

const Homepage = ({ coin }) => {
  const [selectedOption, setSelectedOption] = useState(coin || "ETH");
  const [btcPrice, setBtcPrice] = useState(null); // State to store live BTC price
  const [priceChange, setPriceChange] = useState(null); // State to store price change
  const [percentageChange, setPercentageChange] = useState(null); // State to store percentage change
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  // Update selectedOption when the coin value changes from outside (via hook or prop)
  useEffect(() => {
    if (coin) {
      setSelectedOption(coin);
    }
  }, [coin]);

  // WebSocket connection to Kraken to fetch live coin price
  useEffect(() => {
    const ws = new WebSocket("wss://ws.kraken.com");

    const subscribeToTicker = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          pair: [`${selectedOption}/USD`], // Dynamically subscribe to the selected coin (Kraken uses XBT for Bitcoin)
          subscription: { name: "ticker" },
        })
      );
    };

    ws.onopen = () => {
      subscribeToTicker(); // Subscribe to ticker on WebSocket open
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Check if the message is a ticker update
      if (Array.isArray(data) && data[1] && data[1]["c"]) {
        const livePrice = parseFloat(data[1]["c"][0]).toFixed(2); // Extracting the current price
        const previousPrice = parseFloat(data[1]["p"][0]); // Get the previous price
        const priceChange = (livePrice - previousPrice).toFixed(2); // Calculate price change
        const percentageChange = ((priceChange / previousPrice) * 100).toFixed(
          2
        ); // Calculate percentage change

        setBtcPrice(livePrice);
        setPriceChange(priceChange);
        setPercentageChange(percentageChange);
        setDate(
          new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        ); // Set the date
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close(); // Cleanup on component unmount
    };
  }, [selectedOption]); // Re-subscribe every time the selected coin changes

  return (
    <div className="homepage">
      {/* Main content divided into two sections */}
      <div className="main-content">
        <div className="section-70">
          <h2>{selectedOption} Data</h2>
          {/* Display live Bitcoin price */}
          <h1 style={{ textAlign: "left", marginLeft: "10px" }}>
            ${btcPrice ? btcPrice : "Loading..."}
          </h1>

          {/* Display price change and percentage change */}
          {btcPrice && (
            <p
              style={{
                textAlign: "left",
                marginLeft: "10px",
                fontsize: "1.5rem",
                color: priceChange >= 0 ? "green" : "red",
              }}
            >
              {priceChange >= 0 ? "+" : ""}${priceChange} ({percentageChange}%)
            </p>
          )}

          {/* Display date */}
          <p style={{ textAlign: "left", marginLeft: "10px", color: "#888" }}>
            {date}
          </p>
          <div
            style={{
              height: "100%",
              background: "#ddd",
              width: "90%",
              borderRadius: "12px",
              overflow: "hidden",
              padding: "16px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
              {selectedOption} Bollinger Bands (Real-Time)
            </h2>
            <BollingerBandsChart coin={selectedOption} />

            <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
              {selectedOption} Historical Volatility (Real-Time)
            </h2>
            <HistoricalVolatality coin={selectedOption} />

            <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
              {selectedOption} Candle Chart (Real-Time)
            </h2>
            <CandleChart coin={selectedOption} />
          </div>
        </div>

        <div className="section-30">
          <h2>{selectedOption} </h2>
          {/* <p>
            This is the main area for showing the data for {selectedOption}.
          </p> */}
          <div style={{ height: "150vh", background: "#ddd", width: "100%" }}>
            <ChatAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
