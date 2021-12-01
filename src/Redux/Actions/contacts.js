import {UPDATE_CONTACTS} from '../../Constants';

export function updateContacts(contacts) {
  return {
    type: UPDATE_CONTACTS,
    payload: [...contacts],
  };
}
