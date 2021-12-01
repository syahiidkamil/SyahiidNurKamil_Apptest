import axios from 'axios';
import {BASE_URL} from '@env';

const axiosInstance = axios.create({baseURL: BASE_URL});

export const fetchContacts = async () => {
  try {
    const pathUrl = 'contact';
    const response = await axiosInstance.get(pathUrl);
    return response.data.data;
  } catch (error) {
    return [];
  }
};
