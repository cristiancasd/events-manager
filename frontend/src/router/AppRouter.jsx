import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CheckingAuth } from '../shared/index';
import { checkToken } from '../store';
import { AuthRoutes, EventsRoutes, HomeRoutes, SplashPage } from '../modules';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { status, user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log('estoy en AppRouter');
    if (status !== 'authenticated') {
      dispatch(checkToken());
    }
  }, []);



  useEffect(() => {
    if (status=='not-authenticated') navigate('/auth');
  }, [status]);



  useEffect(() => {
    console.log('************status', status);
  }, [status]);

  if (status === 'checking') {
    return <CheckingAuth />;
  }
  console.log('checking ok')

  return (
  

    < Routes >
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/home/*" element={<HomeRoutes />} />
      <Route path="/events/*" element={<EventsRoutes />} />
      <Route path="/*" element={<SplashPage />} />
    </Routes >
  );
};
