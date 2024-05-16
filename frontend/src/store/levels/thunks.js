import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { eventsStatus } from '../../shared';
import { setLevels, setLevelsStatus } from './levelsSlice';
import { getLevelPath } from './constants';


export const getLevelsList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setLevelsStatus({levels: eventsStatus.fetching}))
    try {
      const { data } = await backendApi.get(getLevelPath(commerceUid));
      dispatch(setLevels(data));

    } catch (error) {
      console.log(error);
      const message = existError(error);
      dispatch(setErrorMessage(message));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 10);
    }
    dispatch(setLevelsStatus({levels: eventsStatus.ok}))
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
