import { clearAuthSession, getAuthSession, saveAuthSession } from "./auth";

describe("admin auth session", () => {
  afterEach(() => {
    clearAuthSession();
    jest.restoreAllMocks();
  });

  test("stores and restores a live session", () => {
    const session = saveAuthSession("token-value", 3600);
    expect(getAuthSession()).toEqual(session);
  });

  test("clears an expired session", () => {
    saveAuthSession("token-value", 1);
    jest.spyOn(Date, "now").mockReturnValue(Date.now() + 2000);

    expect(getAuthSession()).toBeNull();
    expect(sessionStorage.getItem("adminToken")).toBeNull();
  });
});
