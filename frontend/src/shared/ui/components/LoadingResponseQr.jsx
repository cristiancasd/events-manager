import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const LoadingResponseQr = ({ message }) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '70vh', backgroundColor: 'gris', padding: 4 }}
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
