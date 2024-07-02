import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { variableStatus } from '../../shared';
import { addTicketProspectFee, editTicketProspectFeeById, setTicketsProspectFee, setTicketsProspectFeeStatus } from './ticketsSlice';
import { createTicketProspectFeePath, editTicketProspectFeePath, getTicketsProspectFeePath } from './constants';

export const startGetTicketsProspectFeeList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsProspectFeeStatus({ ticketsProspectfee: variableStatus.fetching }));
    try {
      const { data } = await backendApi.get(getTicketsProspectFeePath(commerceUid));
      dispatch(setTicketsProspectFee(data));
    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setTicketsProspectFeeStatus({ ticketsProspectfee: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startCreateTicketProspectFee = ({ ticketData }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsProspectFeeStatus({ ticketsProspectfee: variableStatus.fetching }));

    try {
      const { data } = await backendApi.post(createTicketProspectFeePath, ticketProspectFeeData);
      dispatch(addTicketProspectFee(data));
      dispatch(setSuccessMessage('Ticket Prospecto creado'));
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
    dispatch(setTicketsProspectFeeStatus({ ticketsProspectfee: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startEditTicketProspectFee = ({ ticketProspectFeeData }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setTicketsProspectFeeStatus({ ticketsProspectfee: variableStatus.fetching }));

    try {
      const { data } = await backendApi.put(editTicketProspectFeePath, ticketProspectFeeData);
      dispatch(editTicketProspectFeeById(data));
      dispatch(setSuccessMessage('Ticket Prospecto Editado'));
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
    dispatch(setTicketsProspectFeeStatus({ ticketsProspectfee: variableStatus.ok }));
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
