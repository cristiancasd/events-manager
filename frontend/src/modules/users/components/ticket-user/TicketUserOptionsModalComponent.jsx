import { useSelector } from 'react-redux';


import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, Typography } from '@mui/material';
import { findTicketByLevelUid, getLevelNameById } from '../../../../store';

export const TicketUserOptionsModalsComponent = ({ user, onAddTicketToUser, open, handleClose }) => {

  const { levels } = useSelector((state) => state.levels);
  const { tickets } = useSelector((state) => state.tickets);



  const handleAddTicketToUser = () => {
    onAddTicketToUser();
    handleClose();
  };

  const lineText = (texto1, texto2, bigSize=false) => (
    <Typography >
      <span style={{ fontWeight: 'bold', fontSize: bigSize? 20: 16  }}>{texto1}:</span>
      

       { bigSize
       ? <><br /><span style={{  fontSize: 20  }}>{texto2}</span></>
       :
       texto2
       
       }



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
        <DialogTitle id="scroll-dialog-title">Agregar Ticket al usuario</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>


          <Grid container>
            <Grid item xs={12}  sx={{ mt: 2 }}>
              {lineText('Nombre', user?.name ?? '')}
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {lineText('Nivel', getLevelNameById(user?.levelUid ?? '', levels))}
            </Grid>

            <Grid item xs={6} padding={5}>
              <Grid container >
                {lineText('Valor Preventa',
                 (findTicketByLevelUid(user?.levelUid ?? '', tickets)).presaleFee??'', true)}
                 <Grid paddingTop={2}>
                 <Button onClick={handleAddTicketToUser} variant="contained" fullWidth >
                  Agregar Preventa
                </Button>
                 </Grid>
                
              </Grid>
            </Grid>

          

            <Grid item xs={6} padding={5}>
              <Grid container>
              {lineText('Valor Full', (findTicketByLevelUid(user?.levelUid ?? '', tickets)).saleFee??'', true)}
              <Grid paddingTop={2}>
              <Button onClick={handleAddTicketToUser} variant="contained" fullWidth>
                  Agregar Full
                </Button>
              </Grid>
                
              </Grid>
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
