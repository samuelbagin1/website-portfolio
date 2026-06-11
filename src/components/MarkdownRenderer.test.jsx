import React from "react";
import { render } from "@testing-library/react";
import MarkdownRenderer from "./MarkdownRenderer";
import { DEFAULT_MARKDOWN_CSS } from "../lib/markdownTheme";

describe("MarkdownRenderer", () => {
  test("renders Markdown while disabling raw HTML", () => {
    const { container, getByRole } = render(
      <MarkdownRenderer css={DEFAULT_MARKDOWN_CSS}>
        {"# Heading\n\n<script>alert('x')</script>"}
      </MarkdownRenderer>
    );

    expect(getByRole("heading", { name: "Heading" })).toBeTruthy();
    expect(container.querySelector("script")).toBeNull();
  });

  test("removes unsafe link destinations", () => {
    const { getByText } = render(
      <MarkdownRenderer css={DEFAULT_MARKDOWN_CSS}>{"[unsafe](javascript:alert('x'))"}</MarkdownRenderer>
    );

    expect(getByText("unsafe").closest("a").getAttribute("href")).toBeNull();
  });
});
