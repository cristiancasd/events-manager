import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useEffect } from 'react';

import Swal from 'sweetalert2';

import { LoginForm } from '../components/LoginForm';
import { ImageAuth } from '../components/ImageAuth';

import { useNavigate } from 'react-router-dom';
import { startLogin } from '../../../store';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('estoy en Login Page');
  }, []);

  const { errorMessageAuth, user } = useSelector((state) => state.auth);

  const onSubmit = async ({ event, formState }) => {
    event.preventDefault();
    dispatch(startLogin(formState));
  };

  useEffect(() => {
    if (errorMessageAuth !== undefined && errorMessageAuth !== null) {
      //console.log('errorMessageAuth ', errorMessageAuth)
      Swal.fire('Bad Credentials', errorMessageAuth, 'error');
    }
  }, [errorMessageAuth]);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (
    <AuthLayout title="">
      <Grid container spacing={2} backgroundColor="blac">
        <Grid item xs={12} md={6}>
          <ImageAuth />
        </Grid>

        <Grid item xs={12} md={6} backgroundColor="blac">
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            {<LoginForm onSubmit={onSubmit} title="Sales Counter" />}
          </Grid>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
