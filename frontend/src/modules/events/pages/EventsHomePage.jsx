import { Button, Box, Grid, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { EventsLayout } from '../layout/EventsLayout';
import { createEvent, getEventsList, setEventViewSelected, editEvent } from '../../../store';
import { optionsEventsView } from './eventsConstants';
import { useEffect, useState } from 'react';
import { EventCardComponent, EventsTableComponent, EventModalComponent } from '../components';
import Swal from 'sweetalert2';


const normalizeUrl = (url) => {
  let value;
  if (url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      value = 'http://' + url;
    } else {
      value = url;
    }
  }

  return value;
}

export const EventsHomePage = () => {

  const { events, nextEvent } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.common);


  //MODAL dialog variables
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenEditDialog = () => setOpenEdit(true);
  const handleCloseEditDialog = () => setOpenEdit(false);

  const handleOpenCreateDialog = () => setOpenCreate(true);
  const handleCloseCreateDialog = () => setOpenCreate(false);



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setEventViewSelected(optionsEventsView.events));
    dispatch(getEventsList({ commerceUid: user.commerceUid }));
  }, []);

  useEffect(() => {
    console.log('*************events are ', events)
  }, [events]);

  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Error', errorMessage, 'error');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        //position: "top-end",
        icon: "success",
        title: successMessage,
        showConfirmButton: false,
        timer: 1000
      });
    }
  }, [successMessage]);


  const typegraphyFormat = (text) => {
    return <Typography fontSize={20} sx={{
      display: 'flex',

      color: 'primary.main',
      fontWeight: 'bold',
    }}>
      {text}
    </Typography>
  }

  const handleEditEvent = (data) => {
    const event = {
      id: nextEvent.id,
      date: data.date,
      name: data.eventName,
      description: data.description ?? '',
      url: normalizeUrl(data.url),
      commerceUid: user.commerceUid,
    }
    dispatch(editEvent(event))
  }

  const handleCreateEvent = (data) => {
    const event = {
      date: data.date,
      name: data.eventName,
      description: data.description ?? '',
      url: normalizeUrl(data.url),
      commerceUid: user.commerceUid,
    }
    dispatch(createEvent(event))
  }


  return (
    <EventsLayout title="Administra tus Eventos">
      <EventModalComponent
        actionName={'Editar'}
        title={'Editar evento'}
        onSubmit={handleEditEvent}
        open={openEdit}
        handleClose={handleCloseEditDialog}
        event={nextEvent}
      />


      <EventModalComponent
        actionName={'Crear'}
        title={'Crear evento'}
        onSubmit={handleCreateEvent}
        open={openCreate}
        handleClose={handleCloseCreateDialog}
      />

      <Container maxWidth="lg">
        <Grid container spacing={2} >
          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }} >
            {typegraphyFormat('Próximo evento')}

            {nextEvent
              ? <EventCardComponent
                name={nextEvent.name}
                date={nextEvent.date}
                url={nextEvent.url}
                description={nextEvent.description}
                onClick={handleOpenEditDialog}
              />
              : <Grid paddingTop={1}>
                <Button variant='contained' onClick={handleOpenCreateDialog}>
                  Crear evento
                </Button>
              </Grid>


            }
          </Grid>

          <Grid item xs={12} md={12} paddingTop={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Todos los Eventos')}
            <EventsTableComponent events={events} />
          </Grid>
        </Grid>
      </Container>
    </EventsLayout>
  );
};
