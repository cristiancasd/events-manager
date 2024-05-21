import { Button, Box, Grid, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UsersLayout } from '../layout/UsersLayout';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { LoadingBox, variableStatus } from '../../../shared';

export const ProspectsPage = () => {
  //const { events, nextEvent, eventStatus } = useSelector((state) => state.events);
  //const { user } = useSelector((state) => state.auth);
  const { errorMessage, successMessage, isFetching } = useSelector((state) => state.common);

  //*******************MODAL dialog variables*********************/
  //const [openEdit, setOpenEdit] = useState(false);
  //const [openCreate, setOpenCreate] = useState(false);

  //const handleOpenEditDialog = () => setOpenEdit(true);
  //const handleCloseEditDialog = () => setOpenEdit(false);

  //const handleOpenCreateDialog = () => setOpenCreate(true);
  //const handleCloseCreateDialog = () => setOpenCreate(false);

  //***************** INITIAL dispatchs ************************** */
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(setEventViewSelected(optionsEventsView.events));
    //dispatch(startGetEventsList({ commerceUid: user.commerceUid }));
    //dispatch(startGetLevelsList({ commerceUid: user.commerceUid }));
    //dispatch(startGetTicketsList({ commerceUid: user.commerceUid }));
  }, []);

  //********************POP UP messages*******************+ */
  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Error', errorMessage, 'error');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        //position: "top-end",
        icon: 'success',
        title: successMessage,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }, [successMessage]);

  const typegraphyFormat = (text) => {
    return (
      <Typography
        fontSize={20}
        sx={{
          display: 'flex',

          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        {text}
      </Typography>
    );
  };

  /***************************** Functions *********************** */
  const handleEditEvent = (data) => {
    /*const event = {
      id: nextEvent.id,
      date: data.date,
      name: data.eventName,
      description: data.description ?? '',
      url: normalizeUrl(data.url),
      commerceUid: user.commerceUid,
    };
    dispatch(startEditEvent(event));*/
  };

  const handleCreateEvent = (data) => {
    /*const event = {
      date: data.date,
      name: data.eventName,
      description: data.description ?? '',
      url: normalizeUrl(data.url),
      commerceUid: user.commerceUid,
    };
    dispatch(startCreateEventreateEvent(event));*/
  };

  return (
    <UsersLayout title="Administra tus Prospectos">
      {/*<EventModalComponent
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
      />*/}
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/**Current Event */}
          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Prospectos')}
          </Grid>

          {/**Tickets 
          <Grid item xs={12} md={12} paddingTop={{ xs: 0, sm: 5 }}>
            <TicketsTableComponent />
          </Grid>*/}

          {/**All events 
          <Grid item xs={12} md={12} paddingTop={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Todos los Eventos')}
            {eventStatus.events == variableStatus.initial || eventStatus.events == variableStatus.fetching ? (
              //|| !normalizedLevelsTickets
              <LoadingBox />
            ) : (
              <EventsTableComponent events={events} />
            )}
          </Grid>*/}
        </Grid>
      </Container>
    </UsersLayout>
  );
};
