import React, { useState, useEffect } from "react";
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
import "./BollingerBandsChart.css";
export default function AverageTrueRange() {
    const [chartData, setChartData] = useState([]);

    // Function to fetch ATR data from the backend
    const fetchChartData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/analytics/average_true_range?coin=XBT');
            const data = response.data.data; // Assuming the data comes in { data: [...] } format

            // Transform data to match Recharts format
            // Transform data to match Recharts format with a 7-hour reduction in received_at
            const transformedData = data.map((item) => {
                // Convert received_at to a Date object
                const receivedAtDate = new Date(item.received_at);

                // Subtract 7 hours
                receivedAtDate.setHours(receivedAtDate.getHours() - 7);

                // Return the transformed data
                return {
                    received_at: receivedAtDate.toLocaleTimeString(), // Format the adjusted timestamp
                    ATR: parseFloat(item.ATR), // Ensure the ATR is a float
                };
            });

            console.log(transformedData); // Log data to inspect changes


            setChartData(transformedData);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        // Fetch the data on component mount
        fetchChartData();

        // Set up an interval to fetch data every 1 minute (optional, adjust as needed)
        const interval = setInterval(() => {
            fetchChartData();
        }, 1000); // 1000 milliseconds = 1 second

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div  className='chart-container'style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer> 
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="received_at"
                        tick={{ fontSize: 12 }}
                        label={{ value: "Time", position: "insideBottomRight", offset: -5 }}
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        domain={[550, 560]} // Force a wider Y-axis domain
                        allowDecimals
                        label={{ value: "ATR", angle: -90, position: 'insideLeft', fontSize: 14 }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                        type="monotone"
                        dataKey="ATR"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 8 }}
                        name="Average True Range"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
