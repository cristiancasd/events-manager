import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { variableStatus } from '../../shared';
import { setUser, setUsersStatus } from './usersSlice';
import { createUserPath, editUserPath, findUserByCustomIdOrDocumentPath } from './constants';

export const startFindUserByDocOrId = ({ commerceUid, toSearch }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setUsersStatus({ user: variableStatus.fetching }));
    try {
      const { data } = await backendApi.get(findUserByCustomIdOrDocumentPath(commerceUid, toSearch));
      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setUsersStatus({ user: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startCreateUser = (user) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setUsersStatus({ user: variableStatus.fetching }));
    try {
      const { data } = await backendApi.post(createUserPath, user);
      dispatch(setUser(data));
      dispatch(setSuccessMessage('Usuario Creado'));
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
    dispatch(setUsersStatus({ user: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startEditUser = (user) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setUsersStatus({ user: variableStatus.fetching }));
    try {
      const { data } = await backendApi.put(editUserPath, user);
      dispatch(setUser(data));
      dispatch(setSuccessMessage('Usuario Editado'));
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
    dispatch(setUsersStatus({ user: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

/*export const startGetTicketsList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsStatus({ tickets: variableStatus.fetching }));
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
    dispatch(setTicketsStatus({ tickets: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startCreateTicket = ({ ticketData }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsStatus({ tickets: variableStatus.fetching }));

    try {
      const { data } = await backendApi.post(createTicketPath, ticketData);
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
    dispatch(setTicketsStatus({ tickets: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startEditTicket = ({ ticketData }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsStatus({ tickets: variableStatus.fetching }));

    try {
      const { data } = await backendApi.put(editTicketPath, ticketData);
      dispatch(editTicketById(data));
      dispatch(setSuccessMessage('Ticket Editado'));
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
    dispatch(setTicketsStatus({ tickets: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};*/

const existError = (error, email = '') => {
  //console.log('el error users es ', error)

  try {
    if (error.response) {
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        let errorMessage = '';

        if (errors[0].code == 805) return 'user not found';
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
