import { validateAndScopeMarkdownCss } from "./markdownTheme";

describe("Markdown theme validation", () => {
  test("normalizes and scopes supported rules", () => {
    const result = validateAndScopeMarkdownCss("h1, h2 { color: #fff; font-size: 2rem; }");

    expect(result.errors).toEqual([]);
    expect(result.css).toContain("h1, h2 { color: #fff; font-size: 2rem; }");
    expect(result.scopedCss).toContain(".develop-markdown h1, .develop-markdown h2");
  });

  test("rejects page-wide selectors and unsafe declarations", () => {
    const result = validateAndScopeMarkdownCss("body { position: fixed; } a { background: url(https://example.com/x); }");

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.scopedCss).toBe("");
  });

  test("rejects classes, ids, imports, and important declarations", () => {
    const result = validateAndScopeMarkdownCss("@import 'x'; .card { color: red !important; }");

    expect(result.errors.length).toBeGreaterThan(0);
  });
});
