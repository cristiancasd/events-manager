import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { UserMenu } from './UserMenu';
import static_URLs from '../../config/staticUrls';

export const Navbar = () => {
  const dispatch = useDispatch();
  const url_logo = static_URLs.logo;
  const url_contactPage = static_URLs.contactPage;
  const goToHome = () => {};

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between">
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button
              //href={url_contactPage}
              onClick={goToHome}
            >
              <img src={url_logo} alt="Expo Canada" height="40" />
            </Button>
          </Box>
          <UserMenu />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
