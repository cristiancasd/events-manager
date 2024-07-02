import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { variableStatus } from '../../shared';
import { setTicketProspect, setTicketProspectsStatus } from './ticketProspectsSlice';
import { createTicketProspectPath, editTicketProspectPath, findTicketProspectPath } from './constants';

export const startFindTicketProspect = ({ prospectUid, eventUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketProspectsStatus({ ticketProspect: variableStatus.fetching }));
    try {
      const { data } = await backendApi.get(findTicketProspectPath(prospectUid, eventUid));
      dispatch(setTicketProspect(data));
    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setTicketProspectsStatus({ ticketProspect: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startCreateTicketProspect = (ticketProspect) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketProspectsStatus({ ticketProspect: variableStatus.fetching }));
    try {
      const { data } = await backendApi.post(createTicketProspectPath, ticketProspect);
      dispatch(setTicketProspect(data));
      dispatch(setSuccessMessage('Ticket-Prospect relacionado'));
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
    dispatch(setTicketProspectsStatus({ ticketProspect: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startEditTicketProspect = (ticketProspect) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketProspectsStatus({ ticketProspect: variableStatus.fetching }));
    try {
      const { data } = await backendApi.put(editTicketProspectPath, ticketProspect);
      dispatch(setTicketProspect(data));
      dispatch(setSuccessMessage('Ticket-Prospect Editado'));
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
    dispatch(setTicketProspectsStatus({ ticketProspect: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

const existError = (error, email = '') => {
  //console.log('el error ticketProspects es ', error)

  try {
    if (error.response) {
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        let errorMessage = '';

        if (errors[0].code == 808) return 'Ticket-Prospect not found';
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
