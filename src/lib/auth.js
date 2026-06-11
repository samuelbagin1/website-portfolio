const TOKEN_KEY = "adminToken";
const EXPIRES_KEY = "adminTokenExpiresAt";

export function saveAuthSession(token, expiresIn) {
  const expiresAt = Date.now() + Number(expiresIn) * 1000;
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(EXPIRES_KEY, String(expiresAt));
  return { token, expiresAt };
}

export function clearAuthSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
}

export function getAuthSession() {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiresAt = Number(sessionStorage.getItem(EXPIRES_KEY));

  if (!token || !expiresAt || expiresAt <= Date.now()) {
    clearAuthSession();
    return null;
  }

  return { token, expiresAt };
}
