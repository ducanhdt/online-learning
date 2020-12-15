import { api as API } from './api';

export async function upFile(formData, headers) {
  try {
    // console.log({classroomId,accessToken});
    const response = await API({
      method: 'POST',
      url: `/upload`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        formData,
        headers
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
