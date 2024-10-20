// // import React, { useEffect, useState } from "react";

// // const CoinStats = () => {
// //   const [stats, setStats] = useState(null);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       const response = await fetch("http://localhost:4000/api/analytics/stats");
// //       const data = await response.json();
// //       setStats(data.data);
// //     };

// //     fetchStats();
// //   }, []);

// //   if (!stats) return <div>Loading...</div>;

// //   return (
// //     <div>
// //       <h2>Coin Stats</h2>
// //       <p>
// //         <strong>Best Ask Price Coin:</strong> {stats.best_ask_coin} -{" "}
// //         {stats.best_ask_price}
// //       </p>
// //       <p>
// //         <strong>Best Bid Price Coin:</strong> {stats.best_bid_coin} -{" "}
// //         {stats.best_bid_price}
// //       </p>
// //       <p>
// //         <strong>Max Volume Coin:</strong> {stats.max_volume_coin} -{" "}
// //         {stats.max_volume}
// //       </p>
// //       <p>
// //         <strong>Max Price Coin:</strong> {stats.max_price_coin} -{" "}
// //         {stats.max_price}
// //       </p>
// //       <p>
// //         <strong>Min Volume Coin:</strong> {stats.min_volume_coin} -{" "}
// //         {stats.min_volume}
// //       </p>
// //       <p>
// //         <strong>Min Price Coin:</strong> {stats.min_price_coin} -{" "}
// //         {stats.min_price}
// //       </p>
// //     </div>
// //   );
// // };

// // export default CoinStats;

// // src/components/CoinStats.js

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000'); // Change to your backend URL if necessary

// const CoinStats = () => {
//   const [stats, setStats] = useState(null);
//   const [analytics, setAnalytics] = useState([]);

//   useEffect(() => {
//     // Listen for stats updates
//     socket.on('statsUpdate', (statsUpdate) => {
//       console.log('Received statsUpdate:', statsUpdate);
//       setStats(statsUpdate);
//     });

//     // Listen for analytics updates
//     socket.on('analyticsUpdate', (analyticsUpdate) => {
//       console.log('Received analyticsUpdate:', analyticsUpdate);
//       setAnalytics((prevAnalytics) => {
//         const updatedAnalytics = [...prevAnalytics, analyticsUpdate];
//         if (updatedAnalytics.length > 100) {
//           updatedAnalytics.shift(); // Limit data to the latest 100 points for performance reasons
//         }
//         return updatedAnalytics;
//       });
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off('statsUpdate');
//       socket.off('analyticsUpdate');
//     };
//   }, []);

//   if (!stats) return <div>Loading stats...</div>;

//   return (
//     <div>
//       <h2>Real-Time Coin Stats</h2>
//       <div className="stats">
//         <p><strong>Best Ask Price Coin:</strong> {stats.best_ask_coin} - {stats.best_ask_price}</p>
//         <p><strong>Best Bid Price Coin:</strong> {stats.best_bid_coin} - {stats.best_bid_price}</p>
//         <p><strong>Max Volume Coin:</strong> {stats.max_volume_coin} - {stats.max_volume}</p>
//         <p><strong>Max Price Coin:</strong> {stats.max_price_coin} - {stats.max_price}</p>
//         <p><strong>Min Volume Coin:</strong> {stats.min_volume_coin} - {stats.min_volume}</p>
//         <p><strong>Min Price Coin:</strong> {stats.min_price_coin} - {stats.min_price}</p>
//       </div>

//       <h2>Real-Time Coin Analytics</h2>
//       {analytics.map((analytic, index) => (
//         <div key={index} className="analytics">
//           <h3>{analytic.coin} Analytics</h3>
//           <p><strong>Average Close Price:</strong> {analytic.analytics.average_close_price}</p>
//           <p><strong>Total Volume:</strong> {analytic.analytics.total_volume}</p>
//           {analytic.analytics.bollinger_bands && (
//             <>
//               <p><strong>Bollinger Bands (SMA):</strong> {analytic.analytics.bollinger_bands.sma}</p>
//               <p><strong>Upper Band:</strong> {analytic.analytics.bollinger_bands.upperBand}</p>
//               <p><strong>Lower Band:</strong> {analytic.analytics.bollinger_bands.lowerBand}</p>
//             </>
//           )}
//           {analytic.analytics.moving_average && (
//             <p><strong>Moving Average:</strong> {analytic.analytics.moving_average}</p>
//           )}
//           {analytic.analytics.average_true_range && (
//             <p><strong>Average True Range (ATR):</strong> {analytic.analytics.average_true_range}</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CoinStats;

// src/components/CoinStats.js

// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000"); // Change to your backend URL if necessary

// const CoinStats = () => {
//   const [stats, setStats] = useState(null);
//   const [analytics, setAnalytics] = useState([]);

//   useEffect(() => {
//     // Listen for stats updates
//     socket.on("statsUpdate", (statsUpdate) => {
//       console.log("Received statsUpdate:", statsUpdate);
//       if (statsUpdate) {
//         console.log("Updating stats state:", statsUpdate);
//         setStats(statsUpdate);
//       }
//     });

//     // Listen for analytics updates
//     socket.on("analyticsUpdate", (analyticsUpdate) => {
//       console.log("Received analyticsUpdate:", analyticsUpdate);
//       if (analyticsUpdate) {
//         console.log("Updating analytics state:", analyticsUpdate);
//         setAnalytics((prevAnalytics) => {
//           const updatedAnalytics = [...prevAnalytics, analyticsUpdate];
//           if (updatedAnalytics.length > 100) {
//             updatedAnalytics.shift(); // Limit data to the latest 100 points for performance reasons
//           }
//           return updatedAnalytics;
//         });
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off("statsUpdate");
//       socket.off("analyticsUpdate");
//     };
//   }, []);

//   // Add console log to check if stats is updated
//   console.log("Stats state:", stats);
//   console.log("Analytics state:", analytics);

//   if (!stats) return <div>Loading stats...</div>;

//   return (
//     <div>
//       <h2>Real-Time Coin Stats</h2>
//       <div className="stats">
//         <p>
//           <strong>Best Ask Price Coin:</strong> {stats.best_ask_coin} -{" "}
//           {stats.best_ask_price}
//         </p>
//         <p>
//           <strong>Best Bid Price Coin:</strong> {stats.best_bid_coin} -{" "}
//           {stats.best_bid_price}
//         </p>
//         <p>
//           <strong>Max Volume Coin:</strong> {stats.max_volume_coin} -{" "}
//           {stats.max_volume}
//         </p>
//         <p>
//           <strong>Max Price Coin:</strong> {stats.max_price_coin} -{" "}
//           {stats.max_price}
//         </p>
//         <p>
//           <strong>Min Volume Coin:</strong> {stats.min_volume_coin} -{" "}
//           {stats.min_volume}
//         </p>
//         <p>
//           <strong>Min Price Coin:</strong> {stats.min_price_coin} -{" "}
//           {stats.min_price}
//         </p>
//       </div>

//       <h2>Real-Time Coin Analytics</h2>
//       {analytics.map((analytic, index) => (
//         <div key={index} className="analytics">
//           <h3>{analytic.coin} Analytics</h3>
//           <p>
//             <strong>Average Close Price:</strong>{" "}
//             {analytic.analytics.average_close_price}
//           </p>
//           <p>
//             <strong>Total Volume:</strong> {analytic.analytics.total_volume}
//           </p>
//           {analytic.analytics.bollinger_bands && (
//             <>
//               <p>
//                 <strong>Bollinger Bands (SMA):</strong>{" "}
//                 {analytic.analytics.bollinger_bands.sma}
//               </p>
//               <p>
//                 <strong>Upper Band:</strong>{" "}
//                 {analytic.analytics.bollinger_bands.upperBand}
//               </p>
//               <p>
//                 <strong>Lower Band:</strong>{" "}
//                 {analytic.analytics.bollinger_bands.lowerBand}
//               </p>
//             </>
//           )}
//           {analytic.analytics.moving_average && (
//             <p>
//               <strong>Moving Average:</strong>{" "}
//               {analytic.analytics.moving_average}
//             </p>
//           )}
//           {analytic.analytics.average_true_range && (
//             <p>
//               <strong>Average True Range (ATR):</strong>{" "}
//               {analytic.analytics.average_true_range}
//             </p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CoinStats;

// // src/components/CoinStats.js

// import React, { useEffect, useState } from "react";

// const CoinStats = () => {
//   const [stats, setStats] = useState(null);
//   const [analytics, setAnalytics] = useState([]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/analytics/stats"
//         );
//         const data = await response.json();
//         console.log(data.data.stats);
//         setStats(data.data);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     const fetchAnalytics = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/analytics/analyticsUpdate"
//         );
//         const data = await response.json();
//         setAnalytics((prevAnalytics) => {
//           const updatedAnalytics = [...prevAnalytics, data];
//           if (updatedAnalytics.length > 100) {
//             updatedAnalytics.shift(); // Limit data to the latest 100 points for performance reasons
//           }
//           return updatedAnalytics;
//         });
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//       }
//     };

//     // Call fetch functions every 1 second
//     const interval = setInterval(() => {
//       fetchStats();
//       fetchAnalytics();
//     }, 1000); // 1 second interval

//     // Cleanup on unmount
//     return () => clearInterval(interval);
//   }, []);

//   if (!stats) return <div>Loading stats...</div>;

//   return (
//     <div>
//       <h2>Real-Time Coin Stats</h2>
//       <div className="stats">
//         <p>
//           <strong>Best Ask Price Coin:</strong> {stats.best_ask_coin} -{" "}
//           {stats.best_ask_price}
//         </p>
//         <p>
//           <strong>Best Bid Price Coin:</strong> {stats.best_bid_coin} -{" "}
//           {stats.best_bid_price}
//         </p>
//         <p>
//           <strong>Max Volume Coin:</strong> {stats.max_volume_coin} -{" "}
//           {stats.max_volume}
//         </p>
//         <p>
//           <strong>Max Price Coin:</strong> {stats.max_price_coin} -{" "}
//           {stats.max_price}
//         </p>
//         <p>
//           <strong>Min Volume Coin:</strong> {stats.min_volume_coin} -{" "}
//           {stats.min_volume}
//         </p>
//         <p>
//           <strong>Min Price Coin:</strong> {stats.min_price_coin} -{" "}
//           {stats.min_price}
//         </p>
//       </div>

//       <h2>Real-Time Coin Analytics</h2>
//       {analytics.map((analytic, index) => (
//         <div key={index} className="analytics">
//           <h3>{analytic.coin} Analytics</h3>
//           <p>
//             <strong>Average Close Price:</strong>{" "}
//             {analytic.analytics.average_close_price}
//           </p>
//           <p>
//             <strong>Total Volume:</strong> {analytic.analytics.total_volume}
//           </p>
//           {analytic.analytics.bollinger_bands && (
//             <>
//               <p>
//                 <strong>Bollinger Bands (SMA):</strong>{" "}
//                 {analytic.analytics.bollinger_bands.sma}
//               </p>
//               <p>
//                 <strong>Upper Band:</strong>{" "}
//                 {analytic.analytics.bollinger_bands.upperBand}
//               </p>
//               <p>
//                 <strong>Lower Band:</strong>{" "}
//                 {analytic.analytics.bollinger_bands.lowerBand}
//               </p>
//             </>
//           )}
//           {analytic.analytics.moving_average && (
//             <p>
//               <strong>Moving Average:</strong>{" "}
//               {analytic.analytics.moving_average}
//             </p>
//           )}
//           {analytic.analytics.average_true_range && (
//             <p>
//               <strong>Average True Range (ATR):</strong>{" "}
//               {analytic.analytics.average_true_range}
//             </p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CoinStats;
import React, { useEffect, useState } from "react";
import axios from "axios";

const CoinStats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Function to fetch Coin Stats data from the backend API
  const fetchCoinStats = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/analytics/stats`
      );
      const statsData = response.data.data;
      setStats(statsData);
      setError(null); // Reset error if the request is successful
    } catch (error) {
      console.error("Error fetching Coin Stats data:", error);

      // Capture the error message and log more details
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server response:", error.response.data);
        setError(
          `Server Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request was made but no response was received
        setError("No response from the server.");
      } else {
        // Something else caused the error
        setError(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    // Fetch data immediately when the component mounts
    fetchCoinStats();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(() => {
      fetchCoinStats();
      // Use functional update to ensure the latest value of count is used
      setCount((prevCount) => prevCount + 1);
    }, 1000); // 1000 milliseconds = 1 second

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>Loading stats...</div>;

  return (
    <div>
      <p>API Requests Made: {count}</p>
      <h2>Real-Time Coin Stats</h2>
      <div className="stats">
        <p>
          <strong>Best Ask Price Coin:</strong> {stats.best_ask_coin} -{" "}
          {stats.best_ask_price}
        </p>
        <p>
          <strong>Best Bid Price Coin:</strong> {stats.best_bid_coin} -{" "}
          {stats.best_bid_price}
        </p>
        <p>
          <strong>Max Volume Coin:</strong> {stats.max_volume_coin} -{" "}
          {stats.max_volume}
        </p>
        <p>
          <strong>Max Price Coin:</strong> {stats.max_price_coin} -{" "}
          {stats.max_price}
        </p>
        <p>
          <strong>Min Volume Coin:</strong> {stats.min_volume_coin} -{" "}
          {stats.min_volume}
        </p>
        <p>
          <strong>Min Price Coin:</strong> {stats.min_price_coin} -{" "}
          {stats.min_price}
        </p>
      </div>
    </div>
  );
};

export default CoinStats;
