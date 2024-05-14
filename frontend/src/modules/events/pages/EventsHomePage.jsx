import { Box, Grid, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { EventsLayout } from '../layout/EventsLayout';
import { getEventsList, setEventViewSelected } from '../../../store';
import { optionsEventsView } from './eventsConstants';
import { useEffect } from 'react';

export const EventsHomePage = () => {

  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  useEffect(() => {
    console.log('user is ..',user)
      dispatch(setEventViewSelected(optionsEventsView.events));
      dispatch(getEventsList({commerceUid: user.commerceUid}));
  }, []);

  useEffect(() => {
    console.log('*************events are ', events)
}, [events]);


  return (
    <EventsLayout title="Administra tus Eventos">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} alignSelf="center">
            Siguiente evento
          </Grid>

          <Grid item xs={12} md={6} paddingTop={{ xs: 0, sm: 5 }}>
            Antiguos eventos
          </Grid>
        </Grid>
      </Container>
    </EventsLayout>
  );
};
