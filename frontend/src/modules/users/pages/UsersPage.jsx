import { Box, Grid, Typography, Container, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UsersLayout } from '../layout/UsersLayout';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { LoadingBox, SearchFieldComponent, variableStatus } from '../../../shared';
import { startCreateLevel, startDeleteLevel, startEditLevel, startFindUserByDocOrId, startGetLevelsList } from '../../../store';
import { LevelListComponent } from '../components';

export const UsersPage = () => {
  //const { events, nextEvent, eventStatus } = useSelector((state) => state.events);
  //const { user } = useSelector((state) => state.auth);
  const { errorMessage, successMessage, isFetching } = useSelector((state) => state.common);
  const { usersStatus } = useSelector((state) => state.users);
  const { levels } = useSelector((state) => state.levels);

  //*******************MODAL dialog variables*********************/
  //const [openEdit, setOpenEdit] = useState(false);
  //const [openCreate, setOpenCreate] = useState(false);

  //const handleOpenEditDialog = () => setOpenEdit(true);
  //const handleCloseEditDialog = () => setOpenEdit(false);

  //const handleOpenCreateDialog = () => setOpenCreate(true);
  //const handleCloseCreateDialog = () => setOpenCreate(false);

  //***************** INITIAL dispatchs ************************** */
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(setEventViewSelected(optionsEventsView.events));
    //dispatch(startGetEventsList({ commerceUid: user.commerceUid }));
    dispatch(startGetLevelsList({ commerceUid: user.commerceUid }));
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

  const handleSearchUser = (data) => {
    dispatch(
      startFindUserByDocOrId({
        commerceUid: user.commerceUid,
        toSearch: data,
      })
    );
  };
  const handleEditLevel = (data) => {
    console.log('voy a editar');
    const level = {
      id: data.id,
      name: data.levelName,
      typeId: 4,
      commerceUid: user.commerceUid,
    };
    dispatch(startEditLevel(level))
  };

  const handleDeleteLevel=(data)=>{
    dispatch(startDeleteLevel(data));
  }

  const handleCreateLevel = (data) => {
    const level = {
      name: data.levelName,
      typeId: 4,
      commerceUid: user.commerceUid,
    };
    dispatch(startCreateLevel(level));
  };

  return (
    <UsersLayout title="Administra tus Usuarios">
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
        <Grid container spacing={2} backgroundColor="re">
          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Distribuidor')}
            <SearchFieldComponent
              onSubmit={handleSearchUser}
              customPlaceholder="Celular, ID, o Cédula"
              fetching={usersStatus.user === variableStatus.fetching}
            />

            <Grid item xs={11} md={12} paddingBottom={{ xs: 0, sm: 5 }} paddingTop={{ xs: 2, sm: 5 }}>
              {typegraphyFormat('Niveles')}

              <LevelListComponent 
              handleDelete={handleDeleteLevel}
              levels={levels} handleCreate={handleCreateLevel} handleEdit={handleEditLevel} />
            </Grid>

            {
              //eventStatus.event == variableStatus.initial || eventStatus.event == variableStatus.fetching
              true ? <LoadingBox /> : 'algo'
            }
          </Grid>
        </Grid>
      </Container>
    </UsersLayout>
  );
};
