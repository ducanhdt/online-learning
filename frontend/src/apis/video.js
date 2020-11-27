import { api as API } from './api';

export async function getVideoToken(classroomId, accessToken) {
  try {
    console.log({classroomId,accessToken});
    const response = await API({
      method: 'POST',
      url: `/video/token`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        identity: accessToken,
        room: classroomId
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
