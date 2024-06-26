import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Container, Divider } from '@mui/material';

import { EventsLayout } from '../layout/EventsLayout';
import {
  findTicketByLevelUid,
  resetUsersVariables,
  setCurrentPage,
  setEventViewSelected,
  startCreateTicketUser,
  startFindTicketUser,
  startFindUserByDocOrId,
  startGetEventsList,
  startGetLevelsList,
  startGetTicketsList,
} from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { optionsEventsView } from './eventsConstants';
import { SearchFieldComponent, pagesOptions, variableStatus } from '../../../shared';
import { RegisterUserModalComponent } from '../components/users/RegisterUserModalComponent';
import Swal from 'sweetalert2';

export const EventsAttendeesPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { prospectsStatus, prospect: currentProspect, prospects } = useSelector((state) => state.prospects);
  const { usersStatus, user: currentUser, users } = useSelector((state) => state.users);
  const { nextEvent } = useSelector((state) => state.events);
  const { tickets } = useSelector((state) => state.tickets);
  const { errorMessage, successMessage, isFetching } = useSelector((state) => state.common);

  const [openOptions, setOpenOptions] = useState(false);
  const handleOpenOptions = () => setOpenOptions(true);
  const handleCloseOptions = () => setOpenOptions(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(pagesOptions.attendees));
    dispatch(resetUsersVariables());
    dispatch(startGetLevelsList({ commerceUid: user.commerceUid }));
    dispatch(startGetEventsList({ commerceUid: user.commerceUid }));
    dispatch(startGetTicketsList({ commerceUid: user.commerceUid }));
    dispatch(setEventViewSelected(optionsEventsView.attendees));
  }, []);

  useEffect(() => {
    if (currentUser && nextEvent) {
      dispatch(
        startFindTicketUser({
          userCommerceUid: currentUser.id,
          eventUid: nextEvent.id,
        })
      );
      handleOpenOptions();
    }
  }, [currentUser]);

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

  const typegraphyFormatSmall = (text) => {
    return (
      <Typography
        fontSize={11}
        sx={{
          display: 'flex',
          color: 'primary.main',
          //fontWeight: 'bold',
        }}
      >
        {text}
      </Typography>
    );
  };

  const handleSearchDistribuidor = (data) => {
    dispatch(
      startFindUserByDocOrId({
        commerceUid: user.commerceUid,
        toSearch: data,
      })
    );
  };

  const handleAddTicketToUser = () => {
    const ticketToAdd = {
      hasPresale: true,
      fee: findTicketByLevelUid(currentUser.levelUid, tickets).presaleFee,
      userCommerceUid: currentUser.id,
      totalAttendees: 0,
      eventUid: nextEvent.id,
    };
    dispatch(startCreateTicketUser(ticketToAdd));
  };

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

  useEffect(() => {
    if (errorMessage) {
      if (errorMessage === '710') {
        Swal.fire('Error', 'El usuario ya está registrado', 'error');
      }
    }
  }, [errorMessage]);

  return (
    <EventsLayout title="Asistentes">
      {currentUser && (
        <RegisterUserModalComponent
          onAddTicket={handleAddTicketToUser}
          open={openOptions}
          handleClose={handleCloseOptions}
          user={currentUser}
        />
      )}

      <Container maxWidth="lg">
        <Grid container spacing={2} backgroundColor="re">
          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Registra a tu asistente')}
            <SearchFieldComponent
              onSubmit={handleSearchDistribuidor}
              customPlaceholder="Escribe el celular, CC o ID"
              fetching={usersStatus.user === variableStatus.fetching || usersStatus.user === variableStatus.fetching}
              inputLabel=""
            />
            {typegraphyFormatSmall('*Prospectos buscalos por celular')}
            {typegraphyFormatSmall('*Distribuidores buscalos por CC o ID')}

            <Grid paddingTop={5}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </EventsLayout>
  );
};
