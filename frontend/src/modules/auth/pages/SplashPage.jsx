import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const SplashPage = ({ message = '' }) => {
  console.log('estoy en splash page');

  const { status } = useSelector((state) => state.auth);


  const navigate = useNavigate();


  useEffect(() => {
    if (status=='authenticated') navigate('/home');
    if (status=='not-authenticated') navigate('/auth');
  }, [status]);


  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
      >
        <Grid container direction="row" justifyContent="center">
          <CircularProgress color="warning" />
        </Grid>
        <Grid container direction="row" justifyContent="center">
          Loading {message} ...
        </Grid>
      </Grid>
    </>
  );
};
