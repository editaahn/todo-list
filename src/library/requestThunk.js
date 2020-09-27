import { startLoading, finishLoading } from '../redux-module/loading';

export default function requestThunk(type, request) { 
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (param) => async dispatch => {
    dispatch({ type });
    dispatch(startLoading(type));
    try {
      const res = await request(param);
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true
      });
      dispatch(finishLoading(type));
      throw e;
    }
  };
}