import { Grid, IconButton, Toolbar, Typography, Box } from '@mui/material';
import { Navbar } from '../components/Navbar';

export const CommonLayout = ({ children, title = '' }) => {
  return (
    <Box
      sx={{
        display: 'block',
        width: '100%',
        //padding: '40px 40px 0px',
        backgroundColor: 'yello',
      }}
    >
      <Navbar />
      <Toolbar />

      <Grid
        item
        className="box-shadow"
        xs={12}
        sx={{
          //width: { sm: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          //width: { xs: 330, sm: 600, md: 700, lg: 700 },

          fontSize={{ xs: 20, sm: 30 }}
          color="primary"
          backgroundColor="green"
          fontWeight="bold"
          paddingTop={{ xs: 0, sm: 5 }}
          paddingBottom={{ xs: 0, sm: 5 }}
          textAlign="center"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {title}
        </Typography>
      </Grid>

      {children}
    </Box>
  );
};
