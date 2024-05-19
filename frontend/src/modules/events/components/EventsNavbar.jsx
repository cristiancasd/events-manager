import { AppBar, Box, Button, Grid, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '../../../shared';
import { EditCalendar, Equalizer, Home, PersonAdd } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const EventsNavbar = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');
  const navigateToEvents = () => navigate('/events');
  const navigateToAttendees = () => navigate('/events/attendees');
  const navigateToStats = () => navigate('/events/stats');

  const commonSxIcons = { my: 2, color: 'white', display: 'flex' };
  const commonSxButtons = { my: 2, color: 'white', display: 'flex', paddingRight: 2, paddingLeft: 2, fontSize: 16 };

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between">
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-evenly' }}>
            <IconButton sx={commonSxIcons} onClick={navigateToHome}>
              <Home />
            </IconButton>

            <IconButton sx={commonSxIcons} onClick={navigateToEvents}>
              <EditCalendar />
            </IconButton>

            <IconButton sx={commonSxIcons} onClick={navigateToAttendees}>
              <PersonAdd />
            </IconButton>

            <IconButton sx={commonSxIcons} onClick={navigateToStats}>
              <Equalizer />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <Button sx={{ ...commonSxButtons }} onClick={navigateToHome}>
              Inicio
            </Button>
            <Button sx={commonSxButtons} onClick={navigateToEvents}>
              Eventos
            </Button>
            <Button sx={commonSxButtons} onClick={navigateToAttendees}>
              Asistentes
            </Button>
            <Button sx={commonSxButtons} onClick={navigateToStats}>
              Estadisticas
            </Button>
          </Box>
          <UserMenu />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
