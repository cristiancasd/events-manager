import { Box, Grid, Typography, Container, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UsersLayout } from '../layout/UsersLayout';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { LoadingBox, SearchFieldComponent, pagesOptions, variableStatus } from '../../../shared';
import {
  resetProspectsVariables,
  setProspect,
  startCreateProspect,
  startEditProspect,
  startGetProspectsByUser,
  startFindProspectByPhone,
  setToGloalSearch,
  setCurrentPage,
} from '../../../store';
import { ProspectModalComponent } from '../components/prospects/ProspectModalComponent';
import { ProspectOptionsModalsComponent } from '../components/prospects/ProspectOptionsModalComponent';

export const ProspectsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { errorMessage, successMessage, isFetching } = useSelector((state) => state.common);
  const { prospectsStatus, prospect: currentProspect, prospects } = useSelector((state) => state.prospects);

  //*******************MODAL dialog variables*********************/
  const [openCreateProspect, setOpenCreateProspect] = useState(false);
  const [openEditProspect, setOpenEditProspect] = useState(false);

  const handleOpenEditDialogProspect = () => setOpenEditProspect(true);
  const handleCloseEditDialogProspect = () => setOpenEditProspect(false);

  const handleOpenCreateDialogProspect = () => setOpenCreateProspect(true);
  const handleCloseCreateDialogProspect = () => setOpenCreateProspect(false);

  const [openOptions, setOpenOptions] = useState(false);
  const handleOpenOptions = () => setOpenOptions(true);
  const handleCloseOptions = () => setOpenOptions(false);

  //***************** INITIAL dispatchs ************************** */

  const dispatch = useDispatch();
  //TODO: validate, do this just when the variables are undefined
  useEffect(() => {
    dispatch(setCurrentPage(pagesOptions.prospects));
    dispatch(setToGloalSearch(undefined));
    dispatch(resetProspectsVariables());
  }, []);

  useEffect(() => {
    if (currentProspect) {
      handleOpenOptions();
    }
  }, [currentProspect]);

  useEffect(() => {
    if (errorMessage) {
      if (errorMessage == 'user not found') return;

      if (errorMessage == 'prospect not found') {
        dispatch(setProspect(undefined));
        handleOpenCreateDialogProspect();
        return;
      }
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

  const handleSearchProspect = (data) => {
    dispatch(
      startFindProspectByPhone({
        commerceUid: user.commerceUid,
        prospectPhone: data,
      })
    );
  };

  const handleEditProspect = (data) => {
    const prospectToEdit = {
      ...data,
      commerceUid: user.commerceUid,
    };
    dispatch(startEditProspect(prospectToEdit));
  };

  const handleCreateProspect = (data) => {
    const prospectToCreate = {
      ...data,
      commerceUid: user.commerceUid,
    };
    dispatch(startCreateProspect(prospectToCreate));
  };

  const handleShowTableByUser = (userUid) => {
    dispatch(
      startGetProspectsByUser({
        userUid,
      })
    );
  };

  return (
    <UsersLayout title="Administra tus Prospectos">
      {currentProspect && (
        <ProspectOptionsModalsComponent
          open={openOptions}
          handleClose={handleCloseOptions}
          onEditProspect={() => {
            if (currentProspect) {
              handleOpenEditDialogProspect();
            }
          }}
          prospect={currentProspect}
        />
      )}

      <ProspectModalComponent
        actionName={'Editar'}
        title={'Editar Prospecto'}
        onSubmit={handleEditProspect}
        open={openEditProspect}
        handleClose={handleCloseEditDialogProspect}
        prospect={currentProspect}
      />

      <ProspectModalComponent
        actionName={'Crear'}
        title={'Crear Prospecto'}
        onSubmit={handleCreateProspect}
        open={openCreateProspect}
        handleClose={handleCloseCreateDialogProspect}
        prospect={undefined}
      />

      <Container maxWidth="lg">
        <Grid container spacing={2} backgroundColor="re">
          <Grid item xs={12} md={12} paddingBottom={{ xs: 0, sm: 5 }}>
            {typegraphyFormat('Prospecto')}
            <SearchFieldComponent
              onSubmit={handleSearchProspect}
              customPlaceholder="Escribe el celular"
              fetching={prospectsStatus.prospect === variableStatus.fetching}
            />

            <Grid paddingTop={5}>
              <Divider />
            </Grid>

            {/*prospects.length > 0 && <Grid paddingTop={5}>
              {typegraphyFormat(`Prospectos del nivel: ${getLevelNameById(prospects[0].levelUid, levels)}`)}
              <ProspectLevelTableComponent
                prospects={prospects}
              />
            </Grid>*/}
          </Grid>
        </Grid>
      </Container>
    </UsersLayout>
  );
};
