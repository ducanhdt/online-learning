import { api as API } from './api';

export async function changeAccountInfo(updateDatas, accessToken) {
  try {
    const response = await API({
      method: 'POST',
      url: '/account/change-info',
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { updateDatas },
    });

    return response;
  } catch (error) {
    console.log('error', error);
    return error.response;
  }
}

export async function changePassword(
  { currentPassword, newPassword },
  accessToken,
) {
  try {
    const response = await API({
      method: 'POST',
      url: '/account/change-password',
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { currentPassword, newPassword },
    });
    return response;
  } catch (error) {
    console.log('error', error);
    return error.response;
  }
}

export async function getClassroom(accessToken) {
  // get all classroom account join
  try {
    const response = await API({
      method: 'GET',
      url: `account`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function joinClassroom({classroomId},accessToken) {
  // add account to class
  try {
    const response = await API({
      method: 'POST',
      url: `account`,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {classroomId},
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function outClassroom({classroomId},accessToken) {
  // get out accout from class
  try {
    console.log(classroomId);
    const response = await API({
      method: 'DELETE',
      url: `account`,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {classroomId},
    });
    return response;
  } catch (error) {
    return error.response;
  }
}


