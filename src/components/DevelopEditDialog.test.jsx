import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import DevelopEditDialog from "./DevelopEditDialog";
import { DEFAULT_MARKDOWN_CSS } from "../lib/markdownTheme";

const item = {
  _id: "685f03c0dbef4074eabc80bd",
  title: "Portfolio Website",
  shortText: "Old summary",
  text: "# Old body",
  linkText: "https://example.com/old",
  image: "https://example.com/image.jpg",
  publicId: "develop/image",
  createdAt: "2025-06-27T20:49:04.330Z",
};

describe("DevelopEditDialog", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("submits authenticated develop updates as multipart form data", async () => {
    const updatedItem = { ...item, title: "Updated title", shortText: "Updated summary" };
    const onUpdated = jest.fn();
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => updatedItem,
    });

    const { getByLabelText, getByRole, queryByRole } = render(
      <DevelopEditDialog
        item={item}
        token="admin-token"
        markdownCss={DEFAULT_MARKDOWN_CSS}
        onUpdated={onUpdated}
        onUnauthorized={jest.fn()}
      />
    );

    fireEvent.click(getByRole("button", { name: "Edit" }));
    fireEvent.change(getByLabelText("Title"), { target: { value: "Updated title" } });
    fireEvent.change(getByLabelText("Short summary"), { target: { value: "Updated summary" } });
    fireEvent.click(getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(onUpdated).toHaveBeenCalledWith(updatedItem));
    await waitFor(() => expect(queryByRole("dialog")).toBeNull());

    const [url, request] = global.fetch.mock.calls[0];
    expect(url).toContain("/api/develop");
    expect(request.method).toBe("PUT");
    expect(request.headers.Authorization).toBe("Bearer admin-token");
    expect(request.headers["Content-Type"]).toBeUndefined();
    expect(request.body.get("id")).toBe(item._id);
    expect(request.body.get("title")).toBe("Updated title");
    expect(request.body.get("shortText")).toBe("Updated summary");
    expect(request.body.get("text")).toBe(item.text);
    expect(request.body.get("linkText")).toBe(item.linkText);
    expect(request.body.has("image")).toBe(false);
  });

  test("includes a replacement image when selected", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => item,
    });

    const { getByLabelText, getByRole, queryByRole } = render(
      <DevelopEditDialog
        item={item}
        token="admin-token"
        markdownCss={DEFAULT_MARKDOWN_CSS}
        onUpdated={jest.fn()}
        onUnauthorized={jest.fn()}
      />
    );

    fireEvent.click(getByRole("button", { name: "Edit" }));
    fireEvent.change(getByLabelText("Replace image"), {
      target: { files: [new File(["image"], "replacement.png", { type: "image/png" })] },
    });
    fireEvent.click(getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(queryByRole("dialog")).toBeNull());
    expect(global.fetch.mock.calls[0][1].body.get("image").name).toBe("replacement.png");
  });
});
