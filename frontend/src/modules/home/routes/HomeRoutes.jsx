import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

// Redux

export const HomeRoutes = () => {
  useEffect(() => {
    console.log('estoy en HomeRoutes');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
