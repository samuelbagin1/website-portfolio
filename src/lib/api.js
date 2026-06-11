export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export async function getApiError(response, fallback) {
  try {
    const data = await response.json();
    return data.error || data.message || fallback;
  } catch {
    return fallback;
  }
}

export function authorizationHeaders(token, headers = {}) {
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}
