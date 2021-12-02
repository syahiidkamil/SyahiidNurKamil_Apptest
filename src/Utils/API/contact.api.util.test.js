// @flow

import {fetchContacts} from './contact.api.util';
import axios from 'axios';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({
      data: {
        data: {
          firstName: 'Testing',
          lastName: 'Purpose',
          age: 26,
          photo:
            'https://testing-library.com/docs/react-native-testing-library/intro/',
        },
      },
    }),
    put: jest.fn(),
    delete: jest.fn(),
    post: jest.fn(),
  }),
}));

describe('Contact Api Util', () => {
  describe('#fetchContacts', () => {
    it('should return correctly if fetch succesfully resolved', async () => {
      const mockContact = {
        firstName: 'Testing',
        lastName: 'Purpose',
        age: 26,
        photo:
          'https://testing-library.com/docs/react-native-testing-library/intro/',
      };

      const fetchedContacts = await fetchContacts();

      expect(fetchedContacts).toStrictEqual(mockContact);
    });
  });
});
