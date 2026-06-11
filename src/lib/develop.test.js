import { getDevelopSlug, getShortId, slugifyTitle } from "./develop";

describe("develop URL helpers", () => {
  const project = {
    _id: "685f03c0dbef4074eabc80bd",
    title: "Portfolio Website",
  };

  test("creates a readable unique slug", () => {
    expect(getDevelopSlug(project)).toBe("portfolio-website-685f03c0");
  });

  test("extracts the short id from a canonical slug", () => {
    expect(getShortId(getDevelopSlug(project))).toBe("685f03c0");
  });

  test("normalizes accented titles", () => {
    expect(slugifyTitle("Živé UI & API")).toBe("zive-ui-api");
  });
});
