import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const LoadingBox = ({customHeight, customColor}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: customHeight??200 , backgroundColor: customColor??'white', padding: 4 }}
    >
      <Grid container direction="row" justifyContent="center">
        <CircularProgress color="warning" />
      </Grid>

      
    </Grid>
  );
};
