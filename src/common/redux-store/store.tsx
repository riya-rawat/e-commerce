import { createStore } from 'redux';
import selectedProductReducer from './reducer';

const store = createStore(selectedProductReducer);

export default store;