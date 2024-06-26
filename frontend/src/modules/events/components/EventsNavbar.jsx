import { AppBar, Box, Button, Grid, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserMenu, pagesOptions } from '../../../shared';
import { EditCalendar, Equalizer, Home, PersonAdd } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const EventsNavbar = () => {
  const navigate = useNavigate();

  const { currentPage } = useSelector((state) => state.common);

  const navigateToHome = () => navigate('/home');
  const navigateToEvents = () => navigate('/events');
  const navigateToAttendees = () => navigate('/events/attendees');
  const navigateToStats = () => navigate('/events/stats');

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

            <IconButton
              sx={{ ...commonSxIcons, backgroundColor: currentPage == pagesOptions.events ? 'darkgreen' : '' }}
              onClick={navigateToEvents}
            >
              <EditCalendar />
            </IconButton>

            <IconButton
              sx={{ ...commonSxIcons, backgroundColor: currentPage == pagesOptions.attendees ? 'darkgreen' : '' }}
              onClick={navigateToAttendees}
            >
              <PersonAdd />
            </IconButton>

            <IconButton
              sx={{ ...commonSxIcons, backgroundColor: currentPage == pagesOptions.stats ? 'darkgreen' : '' }}
              onClick={navigateToStats}
            >
              <Equalizer />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <Button
              sx={{
                ...commonSxButtons,
                backgroundColor: currentPage == pagesOptions.home ? 'darkgreen' : '',
                '&:hover': { backgroundColor: 'darkgreen' },
              }}
              onClick={navigateToHome}
            >
              {pagesOptions.home}
            </Button>
            <Button
              sx={{
                ...commonSxButtons,
                backgroundColor: currentPage == pagesOptions.events ? 'darkgreen' : '',
                '&:hover': { backgroundColor: 'darkgreen' },
              }}
              onClick={navigateToEvents}
            >
              {pagesOptions.events}
            </Button>
            <Button
              sx={{
                ...commonSxButtons,
                backgroundColor: currentPage == pagesOptions.attendees ? 'darkgreen' : '',
                '&:hover': { backgroundColor: 'darkgreen' },
              }}
              onClick={navigateToAttendees}
            >
              {pagesOptions.attendees}
            </Button>
            <Button
              sx={{
                ...commonSxButtons,
                backgroundColor: currentPage == pagesOptions.stats ? 'darkgreen' : '',
                '&:hover': { backgroundColor: 'darkgreen' },
              }}
              onClick={navigateToStats}
            >
              {pagesOptions.stats}
            </Button>
          </Box>
          <UserMenu />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
