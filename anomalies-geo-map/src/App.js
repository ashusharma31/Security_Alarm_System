import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MapComponent from './MapComponent';
import DataTableComponent from './DataTableComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const socket = io('http://localhost:4000');

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const handleData = (data) => {
      console.log('Sensor data received:', data);
      setSensorData((currentData) => [...currentData, data]);
    };
  
    socket.on('sensorData', handleData);
  
    // Cleanup function to remove the event listener
    return () => {
      socket.off('sensorData', handleData);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="container" style={{ padding: 20,paddingTop:0 }}>
        <h1 style = {{"text-align": "center", color: "grey"}}>Security Alarm system</h1>
        <MapComponent alarms={sensorData} className="map-container" />
        <DataTableComponent rows={sensorData.map((data, index) => ({ id: index, ...data }))} />
      </div>
    </ThemeProvider>
  );
};

export default App;
