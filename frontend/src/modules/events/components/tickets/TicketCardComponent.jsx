import { Button, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import { TicketModalComponent } from './TicketModalComponent';
import { useState } from 'react';
import { createTicket } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';

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
    dispatch(createTicket({ ticketData: ticket }));
  };

  const handleEditTicket = (data) => {};

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
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography fontSize={20} component="div">
              {name}
            </Typography>
            <Typography variant="h7" component="div">
              Preventa: {presaleFee.toLocaleString('es-CO')}
            </Typography>
            <Typography variant="h7" component="div">
              Venta: {saleFee}
            </Typography>
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
