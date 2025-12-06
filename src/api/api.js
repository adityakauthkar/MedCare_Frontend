import axios from 'axios';
import BASE_URL from './config';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category/categories`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getTopSelling = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/medicine/top-selling`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching TopSelling :', error);
  }
};

export const searchMedicines = async query => {
  try {
    const response = await axios.get(`${BASE_URL}/medicine/searchMedicine`, {
      params: {query}, //  axios way to handle query params
    });
    return response.data.data || []; // Match your API structure
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return [];
  }
};


