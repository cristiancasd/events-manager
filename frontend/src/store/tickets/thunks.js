import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { eventsStatus } from '../../shared';
import { setTickets, setTicketsStatus } from './ticketsSlice';
import { getTicketsPath } from './constants';


export const getTicketsList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsStatus({tickets: eventsStatus.fetching}))
    try {
      const { data } = await backendApi.get(getTicketsPath(commerceUid));
      dispatch(setTickets(data));

    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setTicketsStatus({tickets: eventsStatus.ok}))
    dispatch(setIsFetching(false));

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
