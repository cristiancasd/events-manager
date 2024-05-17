import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { eventsStatus } from '../../shared';
import { addTicket, setTickets, setTicketsStatus } from './ticketsSlice';
import { createTicketPath, getTicketsPath } from './constants';

export const getTicketsList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsStatus({ tickets: eventsStatus.fetching }));
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
    dispatch(setTicketsStatus({ tickets: eventsStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const createTicket = ({ ticketData }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsStatus({ tickets: eventsStatus.fetching }));

    try {
      const { data } = await backendApi.post(createTicketPath, ticketData);
      console.log('response data is ', data);
      dispatch(addTicket(data));
      dispatch(setSuccessMessage('Ticket creado'));
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
    dispatch(setTicketsStatus({ tickets: eventsStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

const existError = (error, email = '') => {
  //console.log('el error users es ', error)

  try {
    if (error.response) {
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        let errorMessage = '';
        errors.forEach((data) => {
          errorMessage += errorMessage + data.message + '\n';
        });
        return errorMessage;
      }
    }
  } catch (err) {
    return 'Server Error';
  }
  return 'Error desconocido';
};
