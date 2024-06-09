import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { variableStatus } from '../../shared';
import { deleteProspect, setProspect, setProspects, setProspectsStatus } from './prospectsSlice';
import {
  createProspectPath,
  deleteProspectByUidPath,
  editProspectPath,
  findProspectByPhonePath,
  getProspectsByUserPath,
} from './constants';

export const startFindProspectByPhone = ({ commerceUid, prospectPhone }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setProspectsStatus({ prospect: variableStatus.fetching }));
    try {
      const { data } = await backendApi.get(findProspectByPhonePath(commerceUid, prospectPhone));
      dispatch(setProspect(data));
    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setProspectsStatus({ prospect: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startGetProspectsByUser = ({ userUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setProspectsStatus({ prospects: variableStatus.fetching }));
    try {
      const { data } = await backendApi.get(getProspectsByUserPath(userUid));
      dispatch(setProspects(data));
    } catch (error) {
      dispatch(setProspects([]));

      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setProspectsStatus({ prospects: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startCreateProspect = (prospect) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setProspectsStatus({ prospect: variableStatus.fetching }));
    try {
      const { data } = await backendApi.post(createProspectPath, prospect);
      dispatch(setProspect(data));
      dispatch(setSuccessMessage('Prospecto Creado'));
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
    dispatch(setProspectsStatus({ prospect: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startDeleteProspect = (prospectUid) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setProspectsStatus({ prospect: variableStatus.fetching }));
    try {
      await backendApi.delete(deleteProspectByUidPath(prospectUid));
      dispatch(deleteProspect(prospectUid));
      dispatch(setSuccessMessage('Prospecto Eliminado'));
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
    dispatch(setProspectsStatus({ prospect: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startEditProspect = (prospect) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setProspectsStatus({ prospect: variableStatus.fetching }));
    try {
      const { data } = await backendApi.put(editProspectPath, prospect);
      dispatch(setProspect(data));
      dispatch(setSuccessMessage('Prospecto Editado'));
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
    dispatch(setProspectsStatus({ prospect: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

const existError = (error, email = '') => {
  //console.log('el error prospects es ', error)

  try {
    if (error.response) {
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        let errorMessage = '';

        if (errors[0].code == 806) return 'prospect not found';
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
