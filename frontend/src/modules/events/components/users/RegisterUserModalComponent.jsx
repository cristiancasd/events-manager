import { Button, Grid, TextField, Typography } from '@mui/material';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '@mui/icons-material';
import { findTicketByLevelUid, getLevelNameById, startRegisterUserAtteendee } from '../../../../store';
import { useEffect } from 'react';

export const RegisterUserModalComponent = ({ user, onAddTicket, open, handleClose }) => {
  const dispatch = useDispatch();

  const { name = '', levelUid = '' } = user;
  const { levels } = useSelector((state) => state.levels);
  const { tickets } = useSelector((state) => state.tickets);
  const { ticketUser } = useSelector((state) => state.ticketUsers);
  const { nextEvent } = useSelector((state) => state.events);

  const handleAddTicket = () => {
    onAddTicket();
    handleClose();
  };

  useEffect(() => {
    if (ticketUser) {
      console.log('vamos a registrar ******************');
      dispatch(startRegisterUserAtteendee({ eventUid: nextEvent.id, userCommerceUid: user.id }));
      handleClose();
    }
  }, [ticketUser]);

  const lineText = (texto1, texto2) => (
    <Typography>
      <span style={{ fontWeight: 'bold' }}>{texto1}:</span> {texto2}
    </Typography>
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">No cuentas con boleta</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {lineText('Nombre', name)}
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {lineText('Nivel', getLevelNameById(levelUid, levels))}
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              {lineText('Precio', findTicketByLevelUid(user?.levelUid ?? '', tickets).saleFee ?? '', true)}
            </Grid>

            <Grid item xs={12} paddingTop={5}>
              <Button onClick={handleAddTicket} variant="contained" fullWidth>
                <Add /> Ticket
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="gris">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
