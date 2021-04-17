import axios from 'axios';

const getHealthCheck = async () => {
  const { data } = await axios.get('health-check/');
  return data;
};

export default getHealthCheck;
