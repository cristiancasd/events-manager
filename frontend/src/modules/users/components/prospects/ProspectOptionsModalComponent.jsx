import Button from '@mui/material/Button';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ProspectOptionsComponent } from './ProspectOptionsComponent';
import { useDispatch, useSelector } from 'react-redux';

export const ProspectOptionsModalsComponent = ({ prospect, onEditProspect, open, handleClose }) => {
  const handleEdit = () => {
    onEditProspect();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Información del Prospecto</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <ProspectOptionsComponent onEditProspect={handleEdit} prospect={prospect} />
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
