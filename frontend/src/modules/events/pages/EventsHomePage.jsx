import { Button, Box, Grid, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { EventsLayout } from '../layout/EventsLayout';
import {
  startCreateEvent,
  startGetEventsList,
  setEventViewSelected,
  startEditEvent,
  startGetLevelsList,
  startGetTicketsList,
  startCreateTicket,
  setCurrentPage,
} from '../../../store';
import { optionsEventsView } from './eventsConstants';
import { useEffect, useState } from 'react';
import { EventCardComponent, EventsTableComponent, EventModalComponent, TicketsTableComponent } from '../components';
import Swal from 'sweetalert2';
import { LoadingBox, pagesOptions, variableStatus } from '../../../shared';

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
};

const relationLevelTicket = (levelUid, tickets) => {
  const ticket = tickets.find((ticket) => ticket.levelUid === levelUid);

  if (ticket) {
    return {
      ticketName: ticket.name,
      ticketPresale: ticket.presaleFee,
      ticketSale: ticket.saleFee,
      ticketUid: ticket.id,
    };
  }

  return {
    ticketName: '',
    ticketPresale: '',
    ticketSale: '',
    ticketUid: '',
  };
};

const arrayLevelsTickets = (levels, tickets) => {
  const levelTicketEntity = {
    levelName: '',
    ticketName: '',
    ticketPresale: '',
    ticketSale: '',
    levelUid: '',
    ticketUid: '',
  };
  return levels.map((data) => {
    const ticket = relationLevelTicket(data.id, tickets);

    levelTicketEntity.levelName = data.name;
    levelTicketEntity.levelUid = data.levelUid;
    levelTicketEntity.ticketName = ticket.ticketName;
    levelTicketEntity.ticketPresale = ticket.ticketPresale;
    levelTicketEntity.ticketSale = ticket.ticketSale;
    levelTicketEntity.ticketUid = ticket.ticketUid;

    return { ...levelTicketEntity };
  });
};

export const EventsHomePage = () => {
  const { events, nextEvent, eventStatus } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const { errorMessage, successMessage, isFetching } = useSelector((state) => state.common);

  //*******************MODAL dialog variables*********************/
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenEditDialog = () => setOpenEdit(true);
  const handleCloseEditDialog = () => setOpenEdit(false);

  const handleOpenCreateDialog = () => setOpenCreate(true);
  const handleCloseCreateDialog = () => setOpenCreate(false);

  //***************** INITIAL dispatchs ************************** */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(pagesOptions.events));
    dispatch(setEventViewSelected(optionsEventsView.events));
    dispatch(startGetEventsList({ commerceUid: user.commerceUid }));
    dispatch(startGetLevelsList({ commerceUid: user.commerceUid }));
    dispatch(startGetTicketsList({ commerceUid: user.commerceUid }));
  }, []);

  //********************** TICKETS normalize *************** */
  /*const [normalizedLevelsTickets, setNormalizedLevelsTickets] = useState(undefined);
  const { levels, levelsStatus } = useSelector((state) => state.levels);
  const { tickets, ticketsStatus } = useSelector((state) => state.tickets);
  useEffect(() => {
    if (levelsStatus.levels != variableStatus.initial && ticketsStatus.tickets != variableStatus.initial) {
      const levelsTickets = arrayLevelsTickets(levels, tickets);
      setNormalizedLevelsTickets(levelsTickets ?? []);
    }
  }),
    [levelsStatus, ticketsStatus];*/

  //********************POP UP messages*******************+ */
  useEffect(() => {
    if (errorMessage) {
      errorMessage.code ? Swal.fire('Error', errorMessage.message, 'error') : Swal.fire('Error', errorMessage, 'error');
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
    const event = {
      id: nextEvent.id,
      date: data.date,
      name: data.eventName,
      description: data.description ?? '',
      url: normalizeUrl(data.url),
      commerceUid: user.commerceUid,
    };
    dispatch(startEditEvent(event));
  };

  const handleCreateEvent = (data) => {
    const event = {
      date: data.date,
      name: data.eventName,
      description: data.description ?? '',
      url: normalizeUrl(data.url),
      commerceUid: user.commerceUid,
    };
    dispatch(startCreateEventreateEvent(event));
  };

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
        <Grid container spacing={2}>
          {/**Current Event */}
          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Próximo evento')}

            {eventStatus.event == variableStatus.initial || eventStatus.event == variableStatus.fetching ? (
              <LoadingBox />
            ) : nextEvent ? (
              <EventCardComponent
                name={nextEvent.name}
                date={nextEvent.date}
                url={nextEvent.url}
                description={nextEvent.description}
                onClick={handleOpenEditDialog}
              />
            ) : (
              <Grid paddingTop={1}>
                <Button variant="contained" onClick={handleOpenCreateDialog}>
                  Crear evento
                </Button>
              </Grid>
            )}
          </Grid>

          {/**Tickets */}
          <Grid item xs={12} md={12} paddingTop={{ xs: 0, sm: 5 }}>
            <TicketsTableComponent />
          </Grid>

          {/**All events */}
          <Grid item xs={12} md={12} paddingTop={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Todos los Eventos')}
            {eventStatus.events == variableStatus.initial || eventStatus.events == variableStatus.fetching ? (
              //|| !normalizedLevelsTickets
              <LoadingBox />
            ) : (
              <EventsTableComponent events={events} />
            )}
          </Grid>
        </Grid>
      </Container>
    </EventsLayout>
  );
};
