import {Button, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions } from '@mui/material';

export const EventCardComponent = ({ name, date, description, url, onClick}) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item alignSelf="center">
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
       
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h7" component="div">
          {date}
        </Typography>
        {url && ( // Verifica si hay una URL
              <Typography paddingTop={1} color="text.secondary">
                <a href={url} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  Click info
                </a>
              </Typography>
            )}
        <Typography paddingTop={1} color="text.secondary">
          {description}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>Editar</Button>
      </CardActions>
    </Card>
      </Grid>
    </Grid>
  );
};
