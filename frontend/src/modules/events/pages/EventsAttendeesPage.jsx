import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Container, Divider } from '@mui/material';

import { EventsLayout } from '../layout/EventsLayout';
import {
  findTicketByLevelUid,
  getLevelNameById,
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
import { SearchFieldComponent, SelectorAndButtonComponent, pagesOptions, variableStatus } from '../../../shared';
import { RegisterUserModalComponent } from '../components/users/RegisterUserModalComponent';
import Swal from 'sweetalert2';
import { startListAttendeesByEventAndLevel } from '../../../store/attendees/thunks';
import { AttendeesUsersLevelTableComponent } from '../components/attendeesUsers/AttendeesUsersLevelTableComponent';

export const EventsAttendeesPage = () => {
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(pagesOptions.attendees));
    dispatch(resetUsersVariables());
    dispatch(startGetLevelsList({ commerceUid: user.commerceUid }));
    dispatch(startGetEventsList({ commerceUid: user.commerceUid }));
    dispatch(startGetTicketsList({ commerceUid: user.commerceUid }));
    dispatch(setEventViewSelected(optionsEventsView.attendees));
  }, []);

  const { user } = useSelector((state) => state.auth);
  const { prospectsStatus, prospect: currentProspect, prospects } = useSelector((state) => state.prospects);
  const { usersStatus, user: currentUser, users } = useSelector((state) => state.users);
  const { nextEvent } = useSelector((state) => state.events);
  const { levels } = useSelector((state) => state.levels);
  const { attendees,attendeesStatus } = useSelector((state) => state.attendees);

  const { tickets } = useSelector((state) => state.tickets);
  const { errorMessage, successMessage, toGlobalSearch } = useSelector((state) => state.common);

  const [openOptions, setOpenOptions] = useState(false);
  const handleOpenOptions = () => setOpenOptions(true);
  const handleCloseOptions = () => setOpenOptions(false);

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
  //TODO: review this
  const handleListUsersAttendees=(levelUid)=>{
    dispatch(startListAttendeesByEventAndLevel({
      eventUid: nextEvent.id,
      levelUid: levelUid,
    }))
  }

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

          <Grid item xs={12} md={6} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Distribuidores Registrados')}
            <SelectorAndButtonComponent
            onSubmit={handleListUsersAttendees}
            customPlaceholder=''
            fetching={attendeesStatus.attendees==variableStatus.fetching}
            inputLabel=''
            options={levels}
            />

            {levels && levels.length > 0 && attendees && attendees.length > 0 && (
              <Grid paddingTop={5}>
                {typegraphyFormat(`Usuarios del nivel: ${getLevelNameById(toGlobalSearch, levels)}`)}
                <AttendeesUsersLevelTableComponent attendeesUser={attendees} />
              </Grid>
            )}
          </Grid>
          


          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Prospectos Registrados')}
          </Grid>

        </Grid>
      </Container>
    </EventsLayout>
  );
};
