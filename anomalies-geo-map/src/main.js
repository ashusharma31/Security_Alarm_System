import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'; // Your map component
import SiteDashboard from './SiteDashboard'; // Your dashboard component

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/site/:id" element={<SiteDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
