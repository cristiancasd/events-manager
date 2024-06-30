import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';

import { useSelector } from 'react-redux';

import {
  Alert,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { UserFourmularyComponent } from '../../../users/components';
import { ProspectFourmularyComponent } from '../../../users/components/prospects/ProspectFormularyComponent';

export const AttendeesRegisterModalComponent = ({ onSubmit, open, handleClose }) => {
  const handleActionSubmit = (data) => {
    onSubmit(data);
    handleClose();
  };

  const [formSelected, setFormSelected] = useState('user');

  return (
    //<Button onClick={handleOpen}>Open modal</Button>
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Debes registrarte primero</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant={formSelected == 'user' ? 'contained' : 'outlined'}
                onClick={() => setFormSelected('user')}
              >
                Distribuidor
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant={formSelected == 'prospect' ? 'contained' : 'outlined'}
                onClick={() => setFormSelected('prospect')}
              >
                Prospecto
              </Button>
            </Grid>
          </Grid>

          {formSelected == 'user' ? (
            <UserFourmularyComponent
              actionName={'Crear Usuario'}
              onSubmit={handleActionSubmit}
              user={undefined}
              disabledRole={true}
            />
          ) : (
            <ProspectFourmularyComponent
              actionName={'Crear Prospecto'}
              onSubmit={handleActionSubmit}
              prospect={undefined}
            />
          )}
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
