import { createStore } from 'redux';
import reducer from './reducer';
import { setDestination } from './actions';

const store = createStore(reducer);
// store.dispatch(setDestination({ latitude: '1111', longitude: '2222' }));

export default store;
