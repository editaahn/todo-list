export default function requestThunk(type, request) { 
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (param) => async dispatch => {
    dispatch({ type });
    try {
      const res = await request(param);
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
      });
      throw e;
    }
  };
}