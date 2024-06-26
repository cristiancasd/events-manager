import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { variableStatus } from '../../shared';
import { registerAttendeePath } from './constants';
import { setAttendee, setAttendeesStatus } from './attendeesSlice';

export const startRegisterUserAtteendee = ({ eventUid, userCommerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setAttendeesStatus({ attendee: variableStatus.fetching }));

    try {
      const { data } = await backendApi.post(registerAttendeePath, { eventUid, userCommerceUid });
      dispatch(setAttendee(data));
      dispatch(setSuccessMessage('Usuario Registrado'));
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
    dispatch(setAttendeesStatus({ attendee: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

const existError = (error, email = '') => {
  //console.log('el error users es ', error)

  try {
    if (error.response) {
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        if (errors.length === 1) {
          const err = errors[0];
          if (err.code && err.code == 710) {
            return '710';
          }
        }

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
