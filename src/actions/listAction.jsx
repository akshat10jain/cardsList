import axios from 'axios';
import { BASE_URL } from '../config';

export const getListAct = (params) => (dispatch) => {
  axios
    .get(`${BASE_URL}/search/anime`, {
      params: { ...params }
    })
    .then((response) => {
      if (response.status) {
        dispatch({
          type: 'LIST_SUCCESS',
          payload: response.data,
        });
      } else {
        dispatch({
          type: 'LIST_FAILURE',
          payload: response.error,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: 'LIST_FAILURE',
        payload: error,
      });
    });
};