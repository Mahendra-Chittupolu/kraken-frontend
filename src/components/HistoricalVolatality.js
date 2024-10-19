import React, { useState, useEffect } from "react";
import "./BollingerBandsChart.css";
import axios from "axios"; // Ensure axios is installed
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function HistoricalVolatility() {
    const [chartData, setChartData] = useState([]);

    // Function to fetch historical volatility data from the backend
    const fetchChartData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/analytics/historical_volatility?coin=XBT');
            const data = response.data.data; // Assuming the data comes in { data: [...] } format

            // Transform data to match Recharts format
            const transformedData = data.map((item) => {
                // Convert received_at to a Date object
                const receivedAtDate = new Date(item.received_at);
            
                // Subtract 7 hours from the timestamp
                receivedAtDate.setHours(receivedAtDate.getHours() - 7);
            
                // Return the transformed data
                return {
                    received_at: receivedAtDate.toLocaleTimeString(), // Format the adjusted timestamp
                    historical_volatility: parseFloat(item.historical_volatility), // Ensure historical volatility is a float
                };
            });
            
            // Set the adjusted data into the chart
            setChartData(transformedData);
            
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        // Fetch the data on component mount
        fetchChartData();

        // Set up an interval to fetch data every second (optional, adjust as needed)
        const interval = setInterval(() => {
            fetchChartData();
        }, 1000); // 1000 milliseconds = 1 second

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='chart-container'style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="received_at" tick={{ fontSize: 12 }} />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        domain={['auto', 'auto']} // Dynamically adjusts based on the data
                        label={{ value: "Volatility", angle: -90, position: 'insideLeft', fontSize: 14 }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                        type="monotone"
                        dataKey="historical_volatility"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 8 }}
                        name="Historical Volatility"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
