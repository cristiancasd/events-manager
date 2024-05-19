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
import { TicketFourmularyComponent } from './TicketFormularyComponent';

export const TicketModalComponent = ({ onSubmit, title, actionName, ticket, open, handleClose }) => {
  const handleActionSubmit = (data) => {
    onSubmit(data);
    handleClose();
  };

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
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <TicketFourmularyComponent actionName={actionName} onSubmit={handleActionSubmit} ticket={ticket} />
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
