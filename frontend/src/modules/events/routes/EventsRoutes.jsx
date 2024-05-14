import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EventsAttendeesPage, EventsHomePage, EventsRegisterPage, EventsStatsPage } from '../pages';

export const EventsRoutes = () => {
  useEffect(() => {
    console.log('estoy en EventsRoutes');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<EventsHomePage />} />
      <Route path="/attendees" element={<EventsAttendeesPage />} />
      <Route path="/register" element={<EventsRegisterPage />} />
      <Route path="/stats" element={<EventsStatsPage />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
