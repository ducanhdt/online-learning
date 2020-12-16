import { upload } from './api';

export async function uploadImage({ imageData }, accessToken) {
  try {
    const response = await upload({
      method: 'POST',
      url: '/uploads/base64',
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { imageData },
    });
    return response;
  } catch (error) {
    //console.log('error', error);
    return error.response;
  }
}
