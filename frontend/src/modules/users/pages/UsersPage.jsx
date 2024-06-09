import { Box, Grid, Typography, Container, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UsersLayout } from '../layout/UsersLayout';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { LoadingBox, SearchFieldComponent, variableStatus } from '../../../shared';
import {
  getLevelNameById,
  resetUsersVariables,
  setTicketUser,
  setUser,
  startCreateLevel,
  startCreateTicketUser,
  startCreateUser,
  startDeleteLevel,
  startEditLevel,
  startEditTicketUser,
  startEditUser,
  startFindTicketUser,
  startFindUserByDocOrId,
  startGetEventsList,
  startGetLevelsList,
  startGetTicketsList,
  startGetUsersByLevel,
} from '../../../store';
import {
  LevelListComponent,
  TicketUserOptionsModalsComponent,
  UserLevelTableComponent,
  UserModalComponent,
  UserOptionsModalsComponent,
} from '../components';
import { TicketUserEditModalsComponent } from '../components/ticket-user/TicketUserEditModalComponent';

export const UsersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { errorMessage, successMessage, isFetching } = useSelector((state) => state.common);
  const { usersStatus, user: currentUser, users } = useSelector((state) => state.users);
  const { levels } = useSelector((state) => state.levels);
  const { tickets } = useSelector((state) => state.tickets);
  const { nextEvent } = useSelector((state) => state.events);

  //*******************MODAL dialog variables*********************/
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);

  const handleOpenEditDialogUser = () => setOpenEditUser(true);
  const handleCloseEditDialogUser = () => setOpenEditUser(false);

  const handleOpenCreateDialogUser = () => setOpenCreateUser(true);
  const handleCloseCreateDialogUser = () => setOpenCreateUser(false);

  const [openOptions, setOpenOptions] = useState(false);
  const handleOpenOptions = () => setOpenOptions(true);
  const handleCloseOptions = () => setOpenOptions(false);

  const [openAddTicket, setOpenAddTicket] = useState(false);
  const handleOpenAddTicket = () => setOpenAddTicket(true);
  const handleCloseAddTicket = () => setOpenAddTicket(false);

  const [openEditTicket, setOpenEditTicket] = useState(false);
  const handleOpenEditTicket = () => setOpenEditTicket(true);
  const handleCloseEditTicket = () => setOpenEditTicket(false);

  //***************** INITIAL dispatchs ************************** */

  const dispatch = useDispatch();
  //TODO: validate, do this just when the variables are undefined
  useEffect(() => {
    dispatch(resetUsersVariables());
    dispatch(startGetEventsList({ commerceUid: user.commerceUid }));
    dispatch(startGetLevelsList({ commerceUid: user.commerceUid }));
    dispatch(startGetTicketsList({ commerceUid: user.commerceUid }));
  }, []);

  //********************POP UP messages*******************+ */
  useEffect(() => {
    if (errorMessage) {
      if (errorMessage == 'user not found') {
        dispatch(setUser(undefined));
        handleOpenCreateDialogUser();
        return;
      }

      if (errorMessage == 'Ticket not found') {
        dispatch(setTicketUser(undefined));
        return;
      }

      Swal.fire('Error', errorMessage, 'error');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (currentUser && nextEvent) {
      dispatch(
        startFindTicketUser({
          userCommerceUid: currentUser.id,
          eventUid: nextEvent.id,
        })
      );
      setOpenOptions(true);
    }
  }, [currentUser]);

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

  const handleSearchUser = (data) => {
    dispatch(
      startFindUserByDocOrId({
        commerceUid: user.commerceUid,
        toSearch: data,
      })
    );
  };
  const handleEditLevel = (data) => {
    const level = {
      id: data.id,
      name: data.levelName,
      typeId: 4,
      commerceUid: user.commerceUid,
    };
    dispatch(startEditLevel({ levelData: level }));
  };

  const handleDeleteLevel = (data) => {
    dispatch(
      startDeleteLevel({
        levelUid: data,
        commerceUid: user.commerceUid,
      })
    );
  };

  const handleCreateLevel = (data) => {
    const level = {
      name: data.levelName,
      typeId: 4,
      commerceUid: user.commerceUid,
    };
    dispatch(startCreateLevel(level));
  };

  const handleEditUser = (data) => {
    const userToEdit = {
      ...data,
      commerceUid: user.commerceUid,
      isActive: true,
      name: data.userName,
    };
    dispatch(startEditUser(userToEdit));
  };

  const handleCreateUser = (data) => {
    const userToCreate = {
      ...data,
      password: data.document,
      commerceUid: user.commerceUid,
      isActive: true,
      name: data.userName,
    };
    dispatch(startCreateUser(userToCreate));
  };

  const handleAddTicketToUser = (data) => {
    const ticketToAdd = {
      ...data,
      totalAttendees: 0,
      eventUid: nextEvent.id,
    };
    dispatch(startCreateTicketUser(ticketToAdd));
  };

  const handleEditTicketUser = (data) => {
    dispatch(startEditTicketUser(data));
  };

  const handleShowTableByLevel = (levelUid) => {
    dispatch(
      startGetUsersByLevel({
        levelUid,
        commerceUid: user.commerceUid,
      })
    );
  };

  return (
    <UsersLayout title="Administra tus Usuarios">
      <UserModalComponent
        actionName={'Editar'}
        title={'Editar Usuario'}
        onSubmit={handleEditUser}
        open={openEditUser}
        handleClose={handleCloseEditDialogUser}
        user={currentUser}
      />

      <UserModalComponent
        actionName={'Crear'}
        title={'Crear Usuario'}
        onSubmit={handleCreateUser}
        open={openCreateUser}
        handleClose={handleCloseCreateDialogUser}
        user={undefined}
      />

      {currentUser && (
        <UserOptionsModalsComponent
          onAddTicket={handleOpenAddTicket}
          onEditTicket={handleOpenEditTicket}
          open={openOptions}
          handleClose={handleCloseOptions}
          onEditUser={() => {
            if (currentUser) {
              setOpenEditUser(true);
            }
          }}
          user={currentUser}
        />
      )}

      <TicketUserOptionsModalsComponent
        user={currentUser}
        open={openAddTicket}
        handleClose={handleCloseAddTicket}
        onAddTicketToUser={handleAddTicketToUser}
      />

      {openEditTicket && (
        <TicketUserEditModalsComponent
          user={currentUser}
          open={openEditTicket}
          handleClose={handleCloseEditTicket}
          onEditTicketUser={handleEditTicketUser}
        />
      )}

      <Container maxWidth="lg">
        <Grid container spacing={2} backgroundColor="re">
          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Distribuidor')}
            <SearchFieldComponent
              onSubmit={handleSearchUser}
              customPlaceholder="Celular, ID, o Cédula"
              fetching={usersStatus.user === variableStatus.fetching}
            />

            <Grid paddingTop={5}>
              <Divider />
            </Grid>

            <Grid item xs={11} md={12} paddingBottom={{ xs: 0, sm: 0 }} paddingTop={{ xs: 2, sm: 5 }}>
              {typegraphyFormat('Niveles')}

              <LevelListComponent
                handleShowTableByLevel={handleShowTableByLevel}
                handleDelete={handleDeleteLevel}
                levels={levels}
                handleCreate={handleCreateLevel}
                handleEdit={handleEditLevel}
              />
            </Grid>

            <Grid paddingTop={5}>
              <Divider />
            </Grid>

            {levels && levels.length > 0 && users && users.length > 0 && (
              <Grid paddingTop={5}>
                {typegraphyFormat(`Usuarios del nivel: ${getLevelNameById(users[0].levelUid, levels)}`)}
                <UserLevelTableComponent users={users} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </UsersLayout>
  );
};
