import {UPDATE_CONTACTS} from '../../Constants';
const initialState = {
  contacts: [],
};
const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
};
export default contactsReducer;
