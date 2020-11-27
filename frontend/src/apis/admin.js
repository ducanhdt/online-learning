import { api as API } from './api';

export async function addAccount({ name, email }, accessToken) {
  try {
    const response = await API({
      method: 'POST',
      url: `/admins/accounts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name,
        email,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getAllAccount(accessToken) {
  try {
    const response = await API({
      method: 'GET',
      url: `/admins/accounts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function deleteAccount(
  { deleteAccountId, accountId },
  accessToken,
) {
  try {
    const response = await API({
      method: 'DELETE',
      url: `/admins/accounts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        deleteAccountId,
        accountId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
