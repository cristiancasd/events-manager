import {Button, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions } from '@mui/material';

export const TicketCardComponent = ({ id, name, presaleFee, saleFee, handleCreateTicket, handleEditTicket}) => {
  return (
    <Grid container justifyContent="center" alignItems="center" padding={2}>
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
          Venta: {saleFee.toLocaleString('es-CO')}
        </Typography>
        
        
      </CardContent>
      <CardActions>
        {
          presaleFee==''
          ? <Button size="small" variant='contained' onClick={()=>handleCreateTicket(id)}>Crear</Button>
          : <Button size="small" onClick={()=>handleEditTicket(id)}>Editar</Button>
        }
      

      </CardActions>
    </Card>
      </Grid>
    </Grid>
  );
};
