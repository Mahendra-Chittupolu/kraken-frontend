import React, { useEffect, useState } from "react";
import axios from "axios";
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
        `http://localhost:4000/api/analytics/bollinger-bands?coin=${coin}&period=20&stdDev=2`
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
    // Clear data when the coin changes
    setData([]);

    // Fetch data immediately on coin change
    fetchBollingerBandsData();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(fetchBollingerBandsData, 1000); // 1000 milliseconds = 1 second

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [coin]); // This effect will run when the coin prop changes

  return (
    <>
      <div className="chart-container" style={{ borderRadius: "8px" }}>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toFixed(2)} // Dynamically formats Y-axis values to fit
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
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="sma"
              stroke="#82ca9d"
              dot={false}
              name="SMA (20)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="upperBand"
              stroke="#ff7300"
              dot={false}
              name="Upper Band"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="lowerBand"
              stroke="#387908"
              dot={false}
              name="Lower Band"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

// Define PropTypes for type checking
BollingerBandsChart.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default BollingerBandsChart;
