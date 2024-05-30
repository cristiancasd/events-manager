import { Box, Grid, Typography, Container, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UsersLayout } from '../layout/UsersLayout';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { LoadingBox, SearchFieldComponent, variableStatus } from '../../../shared';
import { startCreateLevel, startCreateUser, startDeleteLevel, startEditLevel, startEditUser, startFindUserByDocOrId, startGetLevelsList } from '../../../store';
import { LevelListComponent, UserModalComponent, UserOptionsModalsComponent } from '../components';

export const UsersPage = () => {
  //const { events, nextEvent, eventStatus } = useSelector((state) => state.events);
  //const { user } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { errorMessage, successMessage, isFetching } = useSelector((state) => state.common);
  const { usersStatus, user: currentUser } = useSelector((state) => state.users);
  const { levels } = useSelector((state) => state.levels);

    //*******************MODAL dialog variables*********************/
    const [openEditUser, setOpenEditUser] = useState(false);
    const [openCreateUser, setOpenCreateUser] = useState(false);
  
    const handleOpenEditDialogUser = () => setOpenEditUser(true);
    const handleCloseEditDialogUser = () => setOpenEditUser(false);
  
    const handleOpenCreateDialogUser = () => setOpenCreateUser(true);
    const handleCloseCreateDialogUser = () => setOpenCreateUser(false);



    const [openOptions, setOpenOptions] = useState(false);
    const handleOpenOptions = () => setOpenOptions(true);
    const handleCloseOptions = () => setOpenOptions(false);
  
   

  //***************** INITIAL dispatchs ************************** */



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

      if(errorMessage=='user not found'){
        handleOpenCreateDialogUser()
      }else{
        Swal.fire('Error', errorMessage, 'error');

      }
    }
  }, [errorMessage]);


  useEffect(() => {
    if(currentUser) setOpenOptions(true);
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
    console.log('voy a editar data',data);
    const level = {
      id: data.id,
      name: data.levelName,
      typeId: 4,
      commerceUid: user.commerceUid,
    };
    dispatch(startEditLevel({levelData:level}))
  };

  const handleDeleteLevel=(data)=>{
    dispatch(startDeleteLevel({
      levelUid:data,
      commerceUid: user.commerceUid,
    
    }));
  }

  const handleCreateLevel = (data) => {
    const level = {
      name: data.levelName,
      typeId: 4,
      commerceUid: user.commerceUid,
    };
    dispatch(startCreateLevel(level));
  };


  const handleEditUser=(data)=>{
    console.log('handleEditUser...',data);
    const userToEdit={
      ...data,
      password: data.document,
      commerceUid: user.commerceUid,
      isActive:true,
      name: data.userName,
    }
    console.log('data ',data, userToEdit)
    dispatch(startEditUser(userToEdit))

  }

  const handleCreateUser=(data)=>{
    console.log(data);
    const userToCreate={
      ...data,
      password: data.document,
      commerceUid: user.commerceUid,
      isActive:true,
      name: data.userName,
    }
    console.log('data ',data)
    dispatch(startCreateUser(userToCreate))
  }

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


      <UserOptionsModalsComponent
        onAddTicket={()=>{}}
        open={openOptions}
        handleClose={handleCloseOptions}


        onEditUser={()=>{ if(currentUser) {
          //setOpenOptions(false)
          setOpenEditUser(true)
        }}}
        user={currentUser}
      />

      {/*<EventModalComponent
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
