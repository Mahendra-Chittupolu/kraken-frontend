import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import {
    ComposedChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Bar,
    Line,
} from "recharts";

export default function CandlestickChart() {
    const [chartData, setChartData] = useState([]);

    // Function to fetch candlestick data from the backend
    const fetchChartData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/analytics/get_candle_data?coin=XBT');
            const data = response.data.data;

            // Transform data to match Recharts format
            const transformedData = data.map((item) => ({
                time: new Date(item.time_interval).toLocaleTimeString(), // Format the timestamp
                open: parseFloat(item.open_price),
                close: parseFloat(item.close_price),
                high: parseFloat(item.high_price),
                low: parseFloat(item.low_price),
            }));

            setChartData(transformedData);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        // Fetch the data on component mount
        fetchChartData();

        // Set up an interval to fetch data every 1 second (optional, adjust as needed)
        const interval = setInterval(() => {
            fetchChartData();
        }, 10000); // Fetch every 10 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer>
                <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                        label={{ value: "Time", position: "insideBottomRight", offset: -5 }}
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        domain={['auto', 'auto']}
                        allowDecimals
                        label={{ value: "Price", angle: -90, position: 'insideLeft', fontSize: 14 }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />

                    {/* Candlestick wick (high-low) */}
                    <Line
                        type="monotone"
                        dataKey="high"
                        stroke="#000"
                        strokeWidth={2}
                        dot={false}
                        name="High Price"
                    />
                    <Line
                        type="monotone"
                        dataKey="low"
                        stroke="#000"
                        strokeWidth={2}
                        dot={false}
                        name="Low Price"
                    />

                    {/* Candlestick body (open-close) */}
                    <Bar
                        dataKey="open"
                        fill="#82ca9d"
                        name="Open Price"
                        barSize={15}
                    />
                    <Bar
                        dataKey="close"
                        fill="#ff7300"
                        name="Close Price"
                        barSize={15}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
