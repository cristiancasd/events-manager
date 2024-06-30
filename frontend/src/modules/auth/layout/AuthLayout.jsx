import { Box, Grid, Toolbar, Typography } from '@mui/material';
import static_URLs from '../../../config/staticUrls';
import { Navbar } from '../../../shared/components/Navbar';
import { LogoCenter } from '../../../shared/components/LogoCenter';

const url_login = static_URLs.banner_login;
const logoUrl = static_URLs.logo;
export const AuthLayout = ({ children, title = '' }) => {
  return (
    <div>
      <Box
        sx={{
          display: 'block',
          width: '100%',
          padding: '20px 20px 0px',
          backgroundColor: 'yello',
        }}
      >
        <Navbar />
        <Toolbar />

        {/** login formulary */}
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid container backgroundColor="yello" justifyContent="center" alignItems="center">
            {
              //width: { xs: 330, sm: 600, md: 700, lg: 700 },

              <Grid container maxWidth="1000px" backgroundColor="gree">
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {title}
                </Typography>
                {children}
              </Grid>
            }
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
