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

export const postContact = async payload => {
  const pathUrl = 'contact';
  const response = await axiosInstance.post(pathUrl, {...payload});
  return response.message;
};

export const editContact = async (id, payload) => {
  const pathUrl = `contact/${id}`;
  const response = await axiosInstance.put(pathUrl, {...payload});
  return response.message;
};

export const deleteContact = async id => {
  const pathUrl = `contact/${id}`;
  const response = await axiosInstance.delete(pathUrl);
  return response.message;
};
