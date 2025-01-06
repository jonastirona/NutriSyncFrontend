import axios from 'axios';

const BASE_URL = 'http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com';

// Create axios instance with simplified config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('🚀 Request:', {
      url: config.url,
      method: config.method,
      params: config.params,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('✅ Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  error => {
    console.error('❌ Response Error:', {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response
    });
    return Promise.reject(error);
  }
);

// function to login user
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login', null, {
      params: {
        username,
        password
      }
    });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
      config: error.config,
      response: error.response
    });
    throw new Error(error.response?.data || 'Login failed');
  }
};

// function to signup user
export const signupUser = async (email, username, password) => {
  try {
    const response = await api.post('/signup', null, {
      params: {
        email,
        username,
        password
      }
    });
    console.log('Signup response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.response?.data || 'Signup failed');
  }
};

// function to get food search results
export const searchFood = async (keyword, pageNum, pageSize) => {
  try {
    const response = await api.get('/lookup', {
      params: {
        keyword,
        pageNum,
        size: pageSize
      }
    });
    console.log('Search food response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Search food error:', error);
    throw new Error(error.response?.data || 'Search food failed');
  }
};

// function to load more search results
export const loadMoreResults = async (keyword, pageNum, pageSize) => {
  try {
    const response = await api.get('/lookup', {
      params: {
        keyword,
        pageNum,
        size: pageSize
      }
    });
    console.log('Load more results response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Load more results error:', error);
    throw new Error(error.response?.data || 'Load more results failed');
  }
};

// function to get food data by barcode
export const fetchFoodDataByBarcode = async (barcode) => {
  try {
    const response = await api.get('/barcode', {
      params: { barcode }
    });
    console.log('Fetch food data by barcode response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch food data by barcode error:', error);
    throw new Error(error.response?.data || 'Fetch food data by barcode failed');
  }
};

// function to update daily log
export const updateDailyLog = async (username, date, fooditem, calories, protein, carbs, fat) => {
  try {
    const response = await api.post('/updatelog', null, {
      params: {
        username,
        date,
        fooditem,
        calories,
        protein,
        carbs,
        fat
      }
    });
    console.log('Update daily log response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update daily log error:', error);
    throw new Error(error.response?.data || 'Failed to update daily log');
  }
};

// function to get user goal
export const getUserGoal = async (username) => {
  try {
    const response = await api.get('/getgoal', {
      params: { username }
    });
    console.log('Get user goal response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get user goal error:', error);
    throw new Error(error.response?.data || 'Failed to get user goal');
  }
};

// function to set user goal
export const setUserGoal = async (username, goal) => {
  try {
    const response = await api.post('/setgoal', null, {
      params: {
        username,
        goal
      }
    });
    console.log('Set user goal response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Set user goal error:', error);
    throw new Error(error.response?.data || 'Failed to set user goal');
  }
};

// function to get daily log data for a specific user
export const getDailyLog = async (username) => {
  try {
    const response = await api.get('/getlog', {
      params: { username }
    });
    console.log('Get daily log response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get daily log error:', error);
    throw new Error(error.response?.data || 'Failed to get daily log');
  }
};