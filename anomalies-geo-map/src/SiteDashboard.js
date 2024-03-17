import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as service from './services/api/iotSensor';
import './SiteDashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SiteDashboard =  () => {
  const { id } = useParams();
  const { state } = useLocation();
  const position = state.position;
  console.log(id,state,service);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // Define an async function inside the effect
    const fetchData = async () => {
      try {
        let data = await service.getFuelTemperatureData(id);
        let graphArray = [];
        data = data.data;
        for (let i = 0; i < data.length; i++) {
          graphArray.push({
            name: `Record ${i + 1}`,
            temperature: data[i].temperature,
            fuel: data[i].fuelStatus,
          });
        }
        // Update state with the fetched data
        setGraphData(graphArray);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    // Call the async function
    fetchData();
  }, [id]);
  // Placeholder data - replace with data fetched based on the site ID
//   const data = [
//     { name: 'Day 1', temperature: 20, fuel: 80 },
//     { name: 'Day 2', temperature: 30, fuel: 80 },
//     { name: 'Day 3', temperature: 40, fuel: 80 },
//     { name: 'Day 4', temperature: 50, fuel: 80 },
//     { name: 'Day 5', temperature: 60, fuel: 80 },
//     { name: 'Day 6', temperature: 20, fuel: 80 },
//     { name: 'Day 7', temperature: 20, fuel: 80 },
//     // Add more data points as needed
//   ];

  // Fetch and display sensor anomalies and other data as needed

  return (
    <div className="dashboard-container">
    <h2 className="dashboard-title">Site Dashboard for {id}</h2>
    <div className="chart-container">
      <LineChart width={600} height={300} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <Line type="monotone" dataKey="fuel" stroke="#82ca9d" />
      </LineChart>
    </div>
  </div>
  );
};

export default SiteDashboard;
