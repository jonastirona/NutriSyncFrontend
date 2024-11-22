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
    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};