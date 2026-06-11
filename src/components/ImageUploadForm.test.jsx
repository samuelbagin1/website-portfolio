import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import ImageUploadForm from "./ImageUploadForm";
import { DEFAULT_MARKDOWN_CSS } from "../lib/markdownTheme";

describe("ImageUploadForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("submits authenticated develop fields as multipart form data", async () => {
    const onUploadSuccess = jest.fn();
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { getByLabelText, getByRole } = render(
      <ImageUploadForm
        contentType="develop"
        endpoint="/api/develop"
        fields={["title", "shortText", "text", "linkText", "image"]}
        markdownCss={DEFAULT_MARKDOWN_CSS}
        token="admin-token"
        onUnauthorized={jest.fn()}
        onUploadSuccess={onUploadSuccess}
      />
    );

    fireEvent.change(getByLabelText("Title"), { target: { value: "Project title" } });
    fireEvent.change(getByLabelText("Short summary"), { target: { value: "Short summary" } });
    fireEvent.change(getByLabelText("Project body"), { target: { value: "# Markdown body" } });
    fireEvent.change(getByLabelText("Project URL"), { target: { value: "https://example.com" } });
    fireEvent.change(getByLabelText("Image"), { target: { files: [new File(["image"], "project.png", { type: "image/png" })] } });
    fireEvent.click(getByRole("button", { name: "Upload" }));

    await waitFor(() => expect(onUploadSuccess).toHaveBeenCalledTimes(1));

    const [, request] = global.fetch.mock.calls[0];
    expect(request.headers.Authorization).toBe("Bearer admin-token");
    expect(request.headers["Content-Type"]).toBeUndefined();
    expect(request.body.get("title")).toBe("Project title");
    expect(request.body.get("shortText")).toBe("Short summary");
    expect(request.body.get("text")).toBe("# Markdown body");
  });
});
