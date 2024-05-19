import {
  Button,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';
import { TicketModalComponent } from './TicketModalComponent';
import { useState } from 'react';
import { startCreateTicket, startEditTicket } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { LocalActivity } from '@mui/icons-material';

export const TicketCardComponent = ({ id, ticketUid, name, presaleFee, saleFee }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //*******************MODAL Ticketdialog variables*********************/
  const [openEditTicket, setOpenEditTicket] = useState(false);
  const [openCreateTicket, setOpenCreateTicket] = useState(false);

  const handleOpenEditDialogTicket = () => setOpenEditTicket(true);
  const handleCloseEditDialogTicket = () => setOpenEditTicket(false);

  const handleOpenCreateDialogTicket = () => setOpenCreateTicket(true);
  const handleCloseCreateDialogTicket = () => setOpenCreateTicket(false);

  const handleCreateTicket = (data) => {
    const ticket = {
      name: name,
      saleFee: data.saleFee,
      presaleFee: data.presaleFee,
      commerceUid: user.commerceUid,
      levelUid: id,
    };
    dispatch(startCreateTicket({ ticketData: ticket }));
  };

  const handleEditTicket = (data) => {
    const ticket = {
      id: ticketUid,
      name: name,
      saleFee: data.saleFee,
      presaleFee: data.presaleFee,
      commerceUid: user.commerceUid,
      levelUid: id,
    };
    dispatch(startEditTicket({ ticketData: ticket }));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" padding={2}>
      <TicketModalComponent
        actionName={'Crear'}
        title={'Crear Boleto'}
        onSubmit={handleCreateTicket}
        open={openCreateTicket}
        handleClose={handleCloseCreateDialogTicket}
        ticket={saleFee && presaleFee ? { saleFee, presaleFee } : undefined}
      />

      <TicketModalComponent
        actionName={'Editar'}
        title={'Editar Boleto'}
        onSubmit={handleEditTicket}
        open={openEditTicket}
        handleClose={handleCloseEditDialogTicket}
        ticket={saleFee && presaleFee ? { saleFee, presaleFee } : undefined}
      />

      <Grid item alignSelf="center">
        <Card sx={{ minWidth: 275, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'primary.main',
              color: 'white',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LocalActivity />
          </Box>
          <CardContent>
            <Typography fontSize={20} component="div" fontWeight={450}>
              {name}
            </Typography>
            <Grid container backgroundColor="re" paddingTop={2}>
              <Grid item xs="5">
                <Typography variant="h7" component="div" fontWeight={100}>
                  Preventa:
                </Typography>
              </Grid>
              <Grid item xs="7" backgroundColor="yello">
                <Typography variant="h7" component="div" fontWeight={100}>
                  {presaleFee.toLocaleString('es-CO')}
                </Typography>
              </Grid>
            </Grid>

            <Grid container backgroundColor="re">
              <Grid item xs="5">
                <Typography variant="h7" component="div" fontWeight={100}>
                  Venta:
                </Typography>
              </Grid>
              <Grid item xs="7" backgroundColor="yello">
                <Typography variant="h7" component="div" fontWeight={100}>
                  {saleFee.toLocaleString('es-CO')}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            {presaleFee == '' ? (
              <Button size="small" variant="contained" onClick={handleOpenCreateDialogTicket}>
                Crear
              </Button>
            ) : (
              <Button size="small" onClick={handleOpenEditDialogTicket}>
                Editar
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
