// React
import React, { useEffect } from 'react';

// React Router
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

// Redux

export const HomeRoutes = () => {
  useEffect(() => {
    console.log('estoy en HomeRoutes');
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/*" element={<Navigate to={'/home'} />} />

    </Routes>
  );
};
