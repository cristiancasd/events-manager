import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Container } from '@mui/material';
import { CommonLayout } from '../../../shared';
import { CardComponent } from '../components/CardComponent';
import static_URLs from '../../../config/staticUrls';

export const HomePage = () => {
  return (

    <CommonLayout title='Administra tus Eventos'>
      
      <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} alignSelf="center">


              <CardComponent
                title={"Eventos"}
                description={
                  "Crea y administra tus eventos. En esta sección puedes definir precios de boletería, y realizar el registro a tus eventos."
                }
                imagePath={static_URLs.events_image_path}
              />


            </Grid>


            <Grid item xs={12} md={6} paddingTop={{xs:0, sm: 5}}>
              <CardComponent
                title={"Usuarios"}
                description={"Administra los usuarios, puedes asignar roles, editar usuarios, y crear usuarios por medio de .csv"}
                imagePath={static_URLs.users_image_path}
              />
            </Grid>
          </Grid>
      </Container>




    </CommonLayout>

  );
};
