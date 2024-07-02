import { useSelector } from 'react-redux';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { getLevelNameById } from '../../../../store';
import { useEffect, useState } from 'react';

export const TicketUserEditModalsComponent = ({ user, onEditTicketUser, open, handleClose }) => {
  const { levels } = useSelector((state) => state.levels);
  const { tickets } = useSelector((state) => state.tickets);
  const { events, nextEvent } = useSelector((state) => state.events);
  const { ticketUser } = useSelector((state) => state.ticketUsers);

  const [value, setValue] = useState(ticketUser?.fee ?? '');
  const [isPresale, setIsPresale] = useState(ticketUser?.hasPresale??'');

  const handleEditTicketUser = () => {
    const ticketUserInfo = {
      ...ticketUser,
      hasPresale: isPresale,
      fee: value,
    };
    onEditTicketUser(ticketUserInfo);
    handleClose();
  };

  const typographyStyle = { fontWeight: 'bold', fontSize: 16 };
  const lineText = (texto1, texto2, bigSize = false) => (
    <Typography>
      <span style={{ fontWeight: 'bold', fontSize: bigSize ? 20 : 16 }}>{texto1}: </span>

      {bigSize ? (
        <>
          <br />
          <span style={{ fontSize: 20 }}>{texto2}</span>
        </>
      ) : (
        texto2
      )}
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
        <DialogTitle id="scroll-dialog-title">Editar Ticket del usuario</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {lineText('Nombre', user?.name ?? '')}
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {lineText('Nivel', getLevelNameById(user?.levelUid ?? '', levels))}
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {lineText('Evento', nextEvent?.name ?? '')}
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }} paddingBottom={1}>
              {lineText('Valor Anterior', (ticketUser?.fee ?? '').toLocaleString('es-CO'))}
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }} paddingBottom={1}>
              {lineText(
                'Tiene Preventa',
                ticketUser && ticketUser.hasPresale ? (ticketUser.hasPresale ? 'Si' : 'No') : ''
              )}
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }} padding={2}>
              <Typography style={typographyStyle}>Nuevo Valor: </Typography>
              <TextField
                id="standard-basic"
                variant="standard"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }} padding={2}>
              <Typography style={typographyStyle}>Tipo de Boleta: </Typography>

              <Select
                fullWidth
                //labelId="role"
                size="small"
                id="isPresale"
                value={isPresale}
                name="role"
                onChange={(e) => setIsPresale(e.target.value)}
                required
              >
                <MenuItem key={'presale'} value={true}>
                  Preventa
                </MenuItem>
                <MenuItem key={'full'} value={false}>
                  Full
                </MenuItem>
              </Select>
            </Grid>

            <Button
              sx={{ marginTop: 4 }}
              disabled={value === '' || isPresale === ''}
              onClick={handleEditTicketUser}
              variant="contained"
              fullWidth
            >
              Editar
            </Button>
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
