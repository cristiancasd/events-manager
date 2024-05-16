import { backendApi } from '../../api';
import { setEventViewSelected, setNextEvent, setEvents, addEvent, editEventById, setEventStatus  } from './eventsSlice';
import { createEventPath, getEventPath, editEventPath } from './constants';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { findNextEvent } from './utils/findNextEvent';
import { normalizeEventsArray } from './utils/normalizeEventsArray';
import { eventsStatus } from '../../shared';

export const getEventsList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setEventStatus({events: eventsStatus.fetching}))
    try {
      const { data } = await backendApi.get(getEventPath(commerceUid));

      const eventsList= normalizeEventsArray(data)
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
    dispatch(setEventStatus({events: eventsStatus.ok, event: eventsStatus.ok}))
    dispatch(setIsFetching(false));

  };
};


export const createEvent = (eventData) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setEventStatus({event: eventsStatus.fetching}))

    try {
      const { data } = await backendApi.post(createEventPath,eventData);

      const eventsList= normalizeEventsArray([data])
      dispatch(addEvent(eventsList))

    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setEventStatus({event: eventsStatus.ok}))
    dispatch(setIsFetching(false));
  };
};

export const editEvent = (eventData) => {
  return async (dispatch) => {
    dispatch(setEventStatus({event: eventsStatus.fetching}))
    dispatch(setIsFetching(true));
    try {
      const { data } = await backendApi.put(editEventPath, eventData);
      const eventsList= normalizeEventsArray([data])
      dispatch(editEventById(eventsList))
      dispatch(setSuccessMessage('Evento editado'));
      setTimeout(() => {
        dispatch(setSuccessMessage(undefined));
      }, 10);

    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setEventStatus({event: eventsStatus.ok}))
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
