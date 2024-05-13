import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { CheckingAuth } from '../shared/index';
import { checkToken } from '../store';
import { AuthRoutes, HomeRoutes, SplashPage } from '../modules';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log('estoy en AppRouter');
    if (status !== 'authenticated') {
      dispatch(checkToken());
    }
  }, []);

  useEffect(() => {
    console.log('************status',status)
  }, [status]);

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>

      {status === 'not-authenticated'
        ? <Route path="/*" element={<AuthRoutes />} />
        : status === 'authenticated'
          ? <Route path="/*" element={<HomeRoutes />} />
          : <Route path="/*" element={<SplashPage />} />
      }
    </Routes>
  );
};
