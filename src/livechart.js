import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

export default function Chart() {
    const [chartData, setChartData] = useState([
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ]);

    useEffect(() => {
        const updateData = () => {
            setChartData((prevData) => {
                const lastIndex = prevData.length - 1;
                const lastName = prevData[lastIndex].name;
                const nextChar = String.fromCharCode(lastName.charCodeAt(5) + 1);
                const nextName = `Page ${nextChar}`;

                const newDataPoint = {
                    name: nextName,
                    uv: Math.floor(Math.random() * 5000) + 1000, // Random UV value
                    pv: Math.floor(Math.random() * 5000) + 1000, // Random PV value
                    amt: Math.floor(Math.random() * 5000) + 1000, // Random amt value
                };

                // Keep only the last 7 data points
                const updatedData = [...prevData, newDataPoint].slice(-7);

                return updatedData;
            });
        };

        const interval = setInterval(() => {
            updateData();
        }, 1000); // Update every 5 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <LineChart width={800} height={500} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    );
}
