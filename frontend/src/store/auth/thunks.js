import { backendApi } from '../../api';
import { checkingCredentials, onLogin, onLogout, setErrorMessageAuth } from './authSlice';
import { loginPath } from './constants';

export const startLogin = ({ email, password, nickCommerce }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const credentials = {
        nick: nickCommerce,
        email,
        password,
      };

      const { data: dataLogin } = await backendApi.post(loginPath, credentials);
      localStorage.setItem('token', dataLogin.token);
      localStorage.setItem('refreshToken', dataLogin.refreshToken);
      const { data: dataUser } = await backendApi.get(`user/me`);
      dispatch(onLogin(dataUser));
    } catch (error) {
      console.log(error);
      dispatch(onLogout());
      const message = existError(error);
      dispatch(setErrorMessageAuth(message));
      setTimeout(() => {
        dispatch(setErrorMessageAuth(undefined));
      }, 10);
    }
  };
};

export const checkToken = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('no hay token');

        dispatch(onLogout());
        localStorage.clear();
        return;
      }
      console.log('checktoken start');
      dispatch(checkingCredentials());

      const { data: dataUser } = await backendApi.get(`user/me`);
      dispatch(onLogin(dataUser));
    } catch (error) {
      console.log(error);
      dispatch(onLogout());
      localStorage.clear();
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    localStorage.clear();
    dispatch(onLogout());
  };
};

const existError = (error, email = '') => {
  //console.log('el error users es ', error)

  if (error.response) {
    if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
      const errors = error.response.data.errors[0];

      console.log('errors', errors);

      if (errors.code == 804) return 'Credenciales invalidas';
      if (errors.code == 600) return 'Ruta invalida';
    }
  }
  return 'Server Error';
};
