import {createStore, combineReducers} from 'redux';
import contactsReducer from '../Reducers/contactsReducer';
const rootReducer = combineReducers({contacts: contactsReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
