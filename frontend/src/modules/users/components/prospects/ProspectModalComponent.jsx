import Button from '@mui/material/Button';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ProspectFourmularyComponent } from './ProspectFormularyComponent';

export const ProspectModalComponent = ({ onSubmit, title, actionName, prospect, open, handleClose }) => {
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
          <ProspectFourmularyComponent
            actionName={actionName}
            onSubmit={handleActionSubmit}
            prospect={prospect ? { ...prospect, prospectName: prospect?.name ?? '' } : undefined}
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
