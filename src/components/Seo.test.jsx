import { render, waitFor } from "@testing-library/react";
import Seo, { createWebPageSchema } from "./Seo";

describe("Seo", () => {
  beforeEach(() => {
    document.head.querySelectorAll('link[rel="canonical"], #route-structured-data').forEach((element) => element.remove());
  });

  test("sets route metadata, canonical URL, and structured data", async () => {
    const schema = createWebPageSchema({
      path: "/portfolio",
      name: "Portfolio | Samuel Bagin",
      description: "Selected work.",
      type: "CollectionPage",
    });

    render(
      <Seo
        title="Portfolio | Samuel Bagin"
        description="Selected work."
        path="/portfolio"
        schema={schema}
      />
    );

    await waitFor(() => expect(document.title).toBe("Portfolio | Samuel Bagin"));
    expect(document.head.querySelector('meta[name="description"]').getAttribute("content")).toBe("Selected work.");
    expect(document.head.querySelector('meta[property="og:title"]').getAttribute("content")).toBe("Portfolio | Samuel Bagin");
    expect(document.head.querySelector('link[rel="canonical"]').getAttribute("href")).toBe("http://localhost/portfolio");
    expect(JSON.parse(document.getElementById("route-structured-data").textContent)).toMatchObject({
      "@type": "CollectionPage",
      name: "Portfolio | Samuel Bagin",
    });
  });

  test("removes canonical URL and marks private pages noindex", async () => {
    render(
      <Seo
        title="Content management | Samuel Bagin"
        path="/upload"
        robots="noindex,nofollow,noarchive"
        canonical={false}
      />
    );

    await waitFor(() => {
      expect(document.head.querySelector('meta[name="robots"]').getAttribute("content")).toBe("noindex,nofollow,noarchive");
    });
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });
});
