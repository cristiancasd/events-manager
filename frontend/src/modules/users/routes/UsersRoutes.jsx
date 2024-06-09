import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProspectsPage, UsersPage } from '../pages';

export const UsersRoutes = () => {
  useEffect(() => {
    console.log('estoy en UsersRoutes');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/prospects" element={<ProspectsPage />} />
    </Routes>
  );
};
