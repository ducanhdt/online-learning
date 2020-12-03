import { api as API } from './api';

export async function addClassroom({ name, description }, accessToken) {
  try {
    const response = await API({
      method: 'POST',
      url: `/classroom`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name,
        description,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getAllClassroom(accessToken) {
  try {
    const response = await API({
      method: 'GET',
      url: `classroom`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}


export async function getClassroom({classroomId},accessToken) {
  try {
    const response = await API({
      method: 'GET',
      url: `/classroom/${classroomId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function deleteClassroom(
  { classroomId },
  accessToken,
) {
  try {
    const response = await API({
      method: 'DELETE',
      url: `/classroom/${classroomId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
