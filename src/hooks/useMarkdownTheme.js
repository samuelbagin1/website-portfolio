import { useEffect, useState } from "react";
import { DEFAULT_MARKDOWN_CSS, fetchMarkdownTheme, validateAndScopeMarkdownCss } from "../lib/markdownTheme";

export default function useMarkdownTheme() {
  const [css, setCss] = useState(DEFAULT_MARKDOWN_CSS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchMarkdownTheme(controller.signal)
      .then((remoteCss) => {
        const validation = validateAndScopeMarkdownCss(remoteCss);
        setCss(validation.errors.length ? DEFAULT_MARKDOWN_CSS : validation.css);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setCss(DEFAULT_MARKDOWN_CSS);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { css, setCss, loading };
}
