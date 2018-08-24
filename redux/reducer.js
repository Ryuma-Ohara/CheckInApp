import { combineReducers } from 'redux';
import { SET_DESTINATION } from './actions';

const destinationReducer = (state = {}, action) => {
  if (action.type === SET_DESTINATION) {
    return { ...action.payload };
  }
  return state;
};

const reducer = combineReducers({
  destination: destinationReducer,
});
export default reducer;
