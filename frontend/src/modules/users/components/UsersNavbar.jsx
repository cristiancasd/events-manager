import { AppBar, Box, Button, Grid, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '../../../shared';
import { BusinessCenter, EditCalendar, Equalizer, Face, Home, Person, PersonAdd } from '@mui/icons-material';

export const UsersNavbar = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');
  const navigateToUsers = () => navigate('/users');
  const navigateToProspects = () => navigate('/users/prospects');

  const commonSxIcons = { my: 2, color: 'white', display: 'flex' };
  const commonSxButtons = { my: 2, color: 'white', display: 'flex', paddingRight: 2, paddingLeft: 2, fontSize: 16 };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between">
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-evenly' }}>
            <IconButton sx={commonSxIcons} onClick={navigateToHome}>
              <Home />
            </IconButton>

            <IconButton sx={commonSxIcons} onClick={navigateToUsers}>
              <BusinessCenter />
            </IconButton>

            <IconButton sx={commonSxIcons} onClick={navigateToProspects}>
              <Person />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <Button sx={{ ...commonSxButtons }} onClick={navigateToHome}>
              Inicio
            </Button>
            <Button sx={commonSxButtons} onClick={navigateToUsers}>
              Usuarios
            </Button>
            <Button sx={commonSxButtons} onClick={navigateToProspects}>
              Prospectos
            </Button>
          </Box>
          <UserMenu />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
