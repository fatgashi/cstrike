import axiosInstance from '../config/axios';
import configuration from '../config/config';

export async function getAmxAdminRanks() {
  const config = configuration();
  const response = await axiosInstance.get('/amx-admins/ranks', config);
  return response.data;
}

export async function addAmxAdmin(payload) {
  const config = configuration();
  const response = await axiosInstance.post('/amx-admins/add', payload, config);
  return response.data;
}
