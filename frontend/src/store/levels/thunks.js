import { backendApi } from '../../api';
import { setErrorMessage, setIsFetching, setSuccessMessage } from '../common';
import { variableStatus } from '../../shared';
import { addLevel, deleteLevelByUid, editLevelById, setLevels, setLevelsStatus } from './levelsSlice';
import { createLevelPath, deleteLevelPath, editLevelPath, getLevelPath } from './constants';

export const startGetLevelsList = ({ commerceUid }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setLevelsStatus({ levels: variableStatus.fetching }));
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
    dispatch(setLevelsStatus({ levels: variableStatus.ok }));
    dispatch(setIsFetching(false));
  };
};

export const startCreateLevel = (levelData) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setLevelsStatus({ level: variableStatus.fetching }));

    try {
      const { data } = await backendApi.post(createLevelPath, levelData);
      dispatch(addLevel(data));
      dispatch(setSuccessMessage('Nivel Creado'));
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
    dispatch(setLevelsStatus({ level: variableStatus.initial }));
    dispatch(setIsFetching(false));
  };
};


export const startDeleteLevel = ({levelUid, commerceUid}) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setLevelsStatus({ level: variableStatus.fetching }));

    try {
      const { data } = await backendApi.delete(deleteLevelPath(commerceUid,levelUid));
      dispatch(deleteLevelByUid(levelUid));
      dispatch(setSuccessMessage('Nivel Eliminado'));
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
    dispatch(setLevelsStatus({ level: variableStatus.initial }));
    dispatch(setIsFetching(false));
  };
};


export const startEditLevel = ({ levelData }) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setLevelsStatus({ level: variableStatus.fetching }));

    try {
      const { data } = await backendApi.put(editLevelPath, levelData);
      dispatch(editLevelById(data));
      dispatch(setSuccessMessage('Nivel Editado'));
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
    dispatch(setLevelsStatus({ level: variableStatus.ok }));
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
