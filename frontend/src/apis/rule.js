import { api as API } from './api';

export async function getRules(
  { botId, search, offset, limit, sort },
  accessToken,
) {
  try {
    const response = await API.get(`/bots/${botId}/rules`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { search, offset, limit, sort },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getRule({ botId, ruleId }, accessToken) {
  try {
    const response = await API.get(`/bots/${botId}/rules/${ruleId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createRule(
  { name, keyword, botId, actions },
  accessToken,
) {
  try {
    const response = await API({
      method: 'POST',
      url: `/bots/${botId}/rules`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name,
        keyword,
        actions,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateRule(
  { botId, ruleId, name, keyword, actions },
  accessToken,
) {
  try {
    const response = await API({
      method: 'PUT',
      url: `/bots/${botId}/rules/${ruleId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name,
        keyword,
        actions,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function deleteRule({ botId, ruleId }, accessToken) {
  try {
    const response = await API({
      method: 'DELETE',
      url: `bots/${botId}/rules/${ruleId}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
