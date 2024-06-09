import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { variableStatus } from '../../shared';
import { setTicketUser, setTicketUsersStatus } from './ticketUsersSlice';
import { createTicketUserPath, editTicketUserPath, findTicketUserPath } from './constants';

export const startFindTicketUser = ({ userCommerceUid, eventUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketUsersStatus({ user: variableStatus.fetching }));
    try {
      const { data } = await backendApi.get(findTicketUserPath(userCommerceUid, eventUid));
      dispatch(setTicketUser(data));
    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setTicketUsersStatus({ user: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startCreateTicketUser = (ticketUser) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketUsersStatus({ ticketUser: variableStatus.fetching }));
    try {
      const { data } = await backendApi.post(createTicketUserPath, ticketUser);
      dispatch(setTicketUser(data));
      dispatch(setSuccessMessage('Ticket relacionado'));
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
    dispatch(setTicketUsersStatus({ ticketUser: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startEditTicketUser = (ticketUser) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketUsersStatus({ ticketUser: variableStatus.fetching }));
    try {
      const { data } = await backendApi.put(editTicketUserPath, ticketUser);
      dispatch(setTicketUser(data));
      dispatch(setSuccessMessage('Ticket-Usuario Editado'));
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
    dispatch(setTicketUsersStatus({ ticketUser: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

const existError = (error, email = '') => {
  //console.log('el error ticketUsers es ', error)

  try {
    if (error.response) {
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        let errorMessage = '';

        if (errors[0].code == 808) return 'Ticket not found';
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
