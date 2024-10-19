// // src/components/BollingerBandsChart.js

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
// } from 'recharts';
// import { format } from 'date-fns';
// import PropTypes from 'prop-types';
// import './BollingerBandsChart.css'; // Optional: For custom styling

// // Initialize Socket.IO client
// const socket = io('http://localhost:4000'); // Replace with your backend URL if different

// const BollingerBandsChart = ({ coin }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Listen for 'analyticsUpdate' events
//     socket.on('analyticsUpdate', (update) => {
//       if (update.coin !== coin) return; // Filter for the desired coin

//       const { analytics } = update;
//       const { average_close_price, total_volume, bollinger_bands } = analytics;

//       // Get the current timestamp
//       const timestamp = new Date();

//       // Create a new data point
//       const newDataPoint = {
//         timestamp: format(timestamp, 'MM/dd/yyyy HH:mm'),
//         close_price: average_close_price,
//         sma: bollinger_bands ? bollinger_bands.sma : null,
//         upperBand: bollinger_bands ? bollinger_bands.upperBand : null,
//         lowerBand: bollinger_bands ? bollinger_bands.lowerBand : null,
//       };

//       // Update the state with the new data point
//       setData((prevData) => {
//         const updatedData = [...prevData, newDataPoint];
//         // Limit the data to the latest 100 points to optimize performance
//         if (updatedData.length > 100) {
//           updatedData.shift();
//         }
//         return updatedData;
//       });
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('analyticsUpdate');
//     };
//   }, [coin]);

//   return (
//     <div className="chart-container">
//       <h2>{coin} Bollinger Bands (Real-Time)</h2>
//       <ResponsiveContainer width="100%" height={500}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
//           <YAxis
//             domain={['auto', 'auto']}
//             tick={{ fontSize: 12 }}
//             allowDecimals={true}
//           />
//           <Tooltip />
//           <Legend verticalAlign="top" height={36} />
//           <Line
//             type="monotone"
//             dataKey="close_price"
//             stroke="#8884d8"
//             dot={false}
//             name="Average Close Price"
//           />
//           <Line
//             type="monotone"
//             dataKey="sma"
//             stroke="#82ca9d"
//             dot={false}
//             name="SMA (20)"
//           />
//           <Line
//             type="monotone"
//             dataKey="upperBand"
//             stroke="#ff7300"
//             dot={false}
//             name="Upper Band"
//           />
//           <Line
//             type="monotone"
//             dataKey="lowerBand"
//             stroke="#387908"
//             dot={false}
//             name="Lower Band"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Define PropTypes for type checking
// BollingerBandsChart.propTypes = {
//   coin: PropTypes.string.isRequired,
// };

// export default BollingerBandsChart;

// src/components/BollingerBandsChart.js

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
// } from 'recharts';
// import { format } from 'date-fns';
// import PropTypes from 'prop-types';
// import './BollingerBandsChart.css'; // Optional: For custom styling

// // Initialize Socket.IO client
// const socket = io('http://localhost:4000'); // Replace with your backend URL if different

// const BollingerBandsChart = ({ coin }) => {
//   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     // Listen for 'analyticsUpdate' events
// //     socket.on('analyticsUpdate', (update) => {
// //       if (update.coin !== coin) return; // Filter for the desired coin

// //       const { analytics } = update;
// //       const { average_close_price, total_volume, bollinger_bands } = analytics;

// //       // Log the received update
// //       console.log('Received analyticsUpdate:', update);

// //       // Get the current timestamp
// //       const timestamp = new Date();

// //       // Create a new data point
// //       const newDataPoint = {
// //         timestamp: format(timestamp, 'MM/dd/yyyy HH:mm'),
// //         close_price: average_close_price,
// //         sma: bollinger_bands ? bollinger_bands.sma : null,
// //         upperBand: bollinger_bands ? bollinger_bands.upperBand : null,
// //         lowerBand: bollinger_bands ? bollinger_bands.lowerBand : null,
// //       };

// //       // Log the new data point
// //       console.log('New Data Point:', newDataPoint);

// //       // Update the state with the new data point
// //       setData((prevData) => {
// //         const updatedData = [...prevData, newDataPoint];
// //         // Limit the data to the latest 100 points to optimize performance
// //         if (updatedData.length > 100) {
// //           updatedData.shift();
// //         }
// //         return updatedData;
// //       });
// //     });

// //     // Cleanup on component unmount
// //     return () => {
// //       socket.off('analyticsUpdate');
// //     };
// //   }, [coin]);
// useEffect(() => {
//     console.log('Trying to connect to Socket.IO server...');

//     socket.on('connect', () => {
//       console.log('Connected to Socket.IO server');
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from Socket.IO server');
//     });

//     socket.on('connect_error', (error) => {
//       console.error('Connection error:', error);
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('connect_error');
//     };
//   }, []);

//   return (
//     <div className="chart-container">
//       <h2>{coin} Bollinger Bands (Real-Time)</h2>
//       <ResponsiveContainer width="100%" height={500}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
//           <YAxis
//             domain={['auto', 'auto']}
//             tick={{ fontSize: 12 }}
//             allowDecimals={true}
//           />
//           <Tooltip />
//           <Legend verticalAlign="top" height={36} />
//           <Line
//             type="monotone"
//             dataKey="close_price"
//             stroke="#8884d8"
//             dot={false}
//             name="Average Close Price"
//           />
//           <Line
//             type="monotone"
//             dataKey="sma"
//             stroke="#82ca9d"
//             dot={false}
//             name="SMA (20)"
//           />
//           <Line
//             type="monotone"
//             dataKey="upperBand"
//             stroke="#ff7300"
//             dot={false}
//             name="Upper Band"
//           />
//           <Line
//             type="monotone"
//             dataKey="lowerBand"
//             stroke="#387908"
//             dot={false}
//             name="Lower Band"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Define PropTypes for type checking
// BollingerBandsChart.propTypes = {
//   coin: PropTypes.string.isRequired,
// };

// export default BollingerBandsChart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
// } from 'recharts';
// import { format } from 'date-fns';
// import PropTypes from 'prop-types';

// const BollingerBandsChart = ({ coin, interval = 5000 }) => {
//   const [data, setData] = useState([]);

//   // Function to fetch Bollinger Bands data from the backend API
//   const fetchBollingerBandsData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/analytics/bollinger-bands?coin=${coin}&period=20&stdDev=2`);
//       const { bollinger_bands, average_close_price } = response.data;

//       // Get the current timestamp
//       const timestamp = new Date();

//       // Create a new data point
//       const newDataPoint = {
//         timestamp: format(timestamp, 'MM/dd/yyyy HH:mm'),
//         close_price: average_close_price,
//         sma: bollinger_bands ? bollinger_bands.sma : null,
//         upperBand: bollinger_bands ? bollinger_bands.upperBand : null,
//         lowerBand: bollinger_bands ? bollinger_bands.lowerBand : null,
//       };

//       console.log('New Data Point:', newDataPoint);

//       // Update the state with the new data point
//       setData((prevData) => {
//         const updatedData = [...prevData, newDataPoint];
//         // Limit the data to the latest 100 points to optimize performance
//         if (updatedData.length > 100) {
//           updatedData.shift();
//         }
//         return updatedData;
//       });
//     } catch (error) {
//       console.error('Error fetching Bollinger Bands data:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch data immediately on component mount
//     fetchBollingerBandsData();

//     // Set up a polling interval to fetch data every `interval` milliseconds
//     const pollingInterval = setInterval(fetchBollingerBandsData, interval);

//     // Cleanup the interval on component unmount
//     return () => {
//       clearInterval(pollingInterval);
//     };
//   }, [coin, interval]);

//   return (
//     <div className="chart-container">
//       <h2>{coin} Bollinger Bands (Real-Time)</h2>
//       <ResponsiveContainer width="100%" height={500}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
//           <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} allowDecimals />
//           <Tooltip />
//           <Legend verticalAlign="top" height={36} />
//           <Line type="monotone" dataKey="close_price" stroke="#8884d8" dot={false} name="Average Close Price" />
//           <Line type="monotone" dataKey="sma" stroke="#82ca9d" dot={false} name="SMA (20)" />
//           <Line type="monotone" dataKey="upperBand" stroke="#ff7300" dot={false} name="Upper Band" />
//           <Line type="monotone" dataKey="lowerBand" stroke="#387908" dot={false} name="Lower Band" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Define PropTypes for type checking
// BollingerBandsChart.propTypes = {
//   coin: PropTypes.string.isRequired,
//   interval: PropTypes.number, // Polling interval in milliseconds (default 5 seconds)
// };

// export default BollingerBandsChart;

import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to install axios using `npm install axios`
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import PropTypes from "prop-types";
import "./BollingerBandsChart.css"; // Optional: For custom styling

const BollingerBandsChart = ({ coin }) => {
  const [data, setData] = useState([]);

  // Function to fetch Bollinger Bands data from the backend API
  const fetchBollingerBandsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/analytics/bollinger-bands?coin=XBT&period=20&stdDev=2`
      );
      const { bollinger_bands, average_close_price } = response.data;

      // Get the current timestamp
      const timestamp = new Date();

      // Create a new data point
      const newDataPoint = {
        timestamp: format(timestamp, "MM/dd/yyyy HH:mm:ss"), // Include seconds for real-time updates
        close_price: average_close_price,
        sma: bollinger_bands ? bollinger_bands.sma : null,
        upperBand: bollinger_bands ? bollinger_bands.upperBand : null,
        lowerBand: bollinger_bands ? bollinger_bands.lowerBand : null,
      };

      // Update the state with the new data point
      setData((prevData) => {
        const updatedData = [...prevData, newDataPoint];
        // Limit the data to the latest 100 points to optimize performance
        if (updatedData.length > 100) {
          updatedData.shift();
        }
        return updatedData;
      });
    } catch (error) {
      console.error("Error fetching Bollinger Bands data:", error);
    }
  };

  useEffect(() => {
    // Fetch data immediately on component mount
    fetchBollingerBandsData();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(fetchBollingerBandsData, 1000); // 1000 milliseconds = 1 second

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [coin]); // This effect will run when the coin prop changes

  return (
    <div className="chart-container">
      <h2>{coin} Bollinger Bands (Real-Time)</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 12 }}
            allowDecimals
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="close_price"
            stroke="#8884d8"
            dot={false}
            name="Average Close Price"
          />
          <Line
            type="monotone"
            dataKey="sma"
            stroke="#82ca9d"
            dot={false}
            name="SMA (20)"
          />
          <Line
            type="monotone"
            dataKey="upperBand"
            stroke="#ff7300"
            dot={false}
            name="Upper Band"
          />
          <Line
            type="monotone"
            dataKey="lowerBand"
            stroke="#387908"
            dot={false}
            name="Lower Band"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Define PropTypes for type checking
BollingerBandsChart.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default BollingerBandsChart;
