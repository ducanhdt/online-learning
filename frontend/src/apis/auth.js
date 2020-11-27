import { api } from './api';

export async function login(userInfo) {
  try {
    const response = await api.post('/auths/login', userInfo);
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function signup(userInfo) {
  try {
    const response = await api.post('/auths/register', userInfo);
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function verify(accessToken) {
  try {
    const response = await api.get('/auths/verify', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
