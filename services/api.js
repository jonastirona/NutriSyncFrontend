import axios from 'axios';

const BASE_URL = 'http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com';

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