import Button from '@mui/material/Button';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { UserFourmularyComponent } from './UserFormularyComponent';

export const UserModalComponent = ({ onSubmit, title, actionName, user, open, handleClose }) => {
  const handleActionSubmit = (data) => {
    onSubmit(data);
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
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <UserFourmularyComponent
            actionName={actionName}
            onSubmit={handleActionSubmit}
            user={user ? { ...user, userName: user?.name ?? '' } : undefined}
          />
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
