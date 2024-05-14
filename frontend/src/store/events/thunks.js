import { backendApi } from '../../api';
import { setEventViewSelected, setNextEvent, setEvents  } from './eventsSlice';
import { getEventPath } from './constants';
import { setErrorMessage, setIsFetching } from '../common';
import { findNextEvent } from './utils/findNextEvent';

export const getEventsList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
      const { data: eventsList } = await backendApi.get(getEventPath(commerceUid));


      const nextEvent=findNextEvent(eventsList);
      
      dispatch(setEvents(eventsList));
      dispatch(setNextEvent(nextEvent));

    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setIsFetching(false));

  };
};

/*export const checkToken = () => {
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
};*/

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
