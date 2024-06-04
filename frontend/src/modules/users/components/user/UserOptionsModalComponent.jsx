import Button from '@mui/material/Button';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { UserFourmularyComponent } from './UserFormularyComponent';
import { UserOptionsComponent } from './UserOptionsComponent';

export const UserOptionsModalsComponent = ({ user, onEditUser, onAddTicket, open, handleClose }) => {
  const handleEdit = () => {
    onEditUser();
    handleClose();
  };

  const handleAddTicket = () => {
    onAddTicket();
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
        <DialogTitle id="scroll-dialog-title">Información del Usuario</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <UserOptionsComponent onEditUser={handleEdit} onAddTicket={handleAddTicket} user={user} />
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
