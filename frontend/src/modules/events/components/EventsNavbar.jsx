import { AppBar, Box, Button, Grid, Toolbar ,IconButton} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '../../../shared';
import { Home } from '@mui/icons-material';

export const EventsNavbar = () => {
  
  const navigate = useNavigate();

  const navigateToHome=()=> navigate('/home');
  const navigateToEvents=()=> navigate('/events');
  const navigateToRegister=()=> navigate('/events/register');
  const navigateToAttendees=()=> navigate('/events/attendees');
  const navigateToStats=()=> navigate('/events/stats');

  
  const commonSx={ my: 2, color: 'white', display: 'block' }
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between">
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton sx={commonSx} onClick={navigateToHome}>  <Home/> </IconButton>
            <Button sx={commonSx} onClick={navigateToEvents}>  Eventos </Button>
            <Button sx={commonSx} onClick={navigateToRegister}>  Registro </Button>
            <Button  sx={commonSx} onClick={navigateToAttendees}>  Asistentes </Button>
            <Button  sx={commonSx} onClick={navigateToStats}>  Estadisticas </Button>
          </Box>
          <UserMenu />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
