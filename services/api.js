import axios from 'axios';

// url for the backend server
const BASE_URL = 'http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com';

// function to login user
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      null,
      {
        params: {
          username,
          password
        }
      }
    );
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// function to signup user
export const signupUser = async (email, username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/signup`,
      null,
      {
        params: {
          email,
          username,
          password
        }
      }
    );
    console.log('Signup response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

// function to get food search results
export const searchFood = async (keyword, pageNum, pageSize) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup`, {
      params: {
        keyword,
        pageNum,
        size: pageSize
      }
    });
    console.log('Search food response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Search food error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Search food failed');
  }
};

// function to load more search results
export const loadMoreResults = async (keyword, pageNum, pageSize) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup`, {
      params: {
        keyword,
        pageNum,
        size: pageSize
      }
    });
    console.log('Load more results response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Load more results error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Load more results failed');
  }
};

// function to get food data by barcode
export const fetchFoodDataByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${BASE_URL}/barcode`, {
      params: { barcode }
    });
    console.log('Fetch food data by barcode response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch food data by barcode error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Fetch food data by barcode failed');
  }
};

// function to get daily log data
export const updateDailyLog = async (logData) => {
  try {
    const response = await axios.post(`${BASE_URL}/updatelog`, null, {
      params: logData
    });
    console.log('Update daily log response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update daily log error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update daily log');
  }
};