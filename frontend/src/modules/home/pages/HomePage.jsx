import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Container } from '@mui/material';
import { CommonLayout, pagesOptions } from '../../../shared';
import { CardComponent } from '../components/CardComponent';
import static_URLs from '../../../config/staticUrls';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage } from '../../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(pagesOptions.home));
  }, []);

  const navigate = useNavigate();

  const navigateToEvents = () => {
    navigate('/events');
  };

  const navigateToUsers = () => {
    navigate('/users');
  };
  return (
    <CommonLayout title="Administra tus Eventos">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} alignSelf="center">
            <CardComponent
              onClick={navigateToEvents}
              title={'Eventos'}
              description={
                'Crea y administra tus eventos. En esta sección puedes definir precios de boletería, y realizar el registro a tus eventos.'
              }
              imagePath={static_URLs.events_image_path}
            />
          </Grid>

          <Grid item xs={12} md={6} paddingTop={{ xs: 0, sm: 5 }}>
            <CardComponent
              onClick={navigateToUsers}
              title={'Usuarios'}
              description={
                'Administra los usuarios, puedes asignar roles, editar usuarios, y crear usuarios por medio de .csv'
              }
              imagePath={static_URLs.users_image_path}
            />
          </Grid>
        </Grid>
      </Container>
    </CommonLayout>
  );
};
