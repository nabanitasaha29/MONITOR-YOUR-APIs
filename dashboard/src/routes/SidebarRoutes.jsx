import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ApiMonitor from "../pages/APIMonitorPage/ApiMonitor.jsx";
import DahsboardLandingPage from "../pages/dashboard/DahsboardLandingPage.jsx";

const SidebarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing-page" replace />} />

      <Route path="/landing-page" element={<DahsboardLandingPage />} />

      <Route path="/groups/:type/:code" element={<ApiMonitor />} />

      <Route path="*" element={<Navigate to="/landing-page" replace />} />
    </Routes>
  );
};

export default SidebarRoutes;
