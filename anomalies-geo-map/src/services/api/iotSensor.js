import axios from 'axios';

const getFuelTemperatureData = async (towerId) => {
  const response = await axios.get(`http://localhost:4000/api/iot-sensor/${towerId}`);
  return response.data;
};

export { getFuelTemperatureData };
