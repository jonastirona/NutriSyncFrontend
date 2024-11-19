import { useQuery } from 'react-query';
import { getGoal } from '../services/api';

const useUserGoal = (username) => {
  return useQuery(['userGoal', username], () => getGoal(username));
};

export default useUserGoal;