import { API_URL, authorizationHeaders, getApiError } from "./api";

export const DEFAULT_MARKDOWN_CSS = `h1 { font-size: 2.5rem; line-height: 1.1; margin-bottom: 1.5rem; color: #fefefa; }
h2 { font-size: 2rem; line-height: 1.2; margin-top: 2.5rem; margin-bottom: 1rem; color: #fefefa; }
h3 { font-size: 1.5rem; line-height: 1.3; margin-top: 2rem; margin-bottom: 0.75rem; color: #fefefa; }
p { font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.25rem; color: #d4d4d4; }
a { color: #d1d5db; text-decoration: underline; }
ul { margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: disc; }
ol { margin-bottom: 1.25rem; padding-left: 1.5rem; list-style-type: decimal; }
li { margin-bottom: 0.5rem; color: #d4d4d4; }
blockquote { margin: 1.5rem 0; padding-left: 1rem; border-left: 3px solid #d1d5db; color: #b8b8b8; }
pre { margin: 1.5rem 0; padding: 1rem; border-radius: 0.75rem; background-color: #090909; overflow-x: auto; }
code { font-family: monospace; color: #e5e7eb; }
img { max-width: 100%; margin: 2rem auto; border-radius: 0.75rem; }
table { width: 100%; margin: 1.5rem 0; border-collapse: collapse; }
th { padding: 0.75rem; border: 1px solid #3f3f46; text-align: left; color: #fefefa; }
td { padding: 0.75rem; border: 1px solid #3f3f46; color: #d4d4d4; }`;

const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "ul", "ol", "li",
  "blockquote", "pre", "code", "img", "table", "thead", "tbody", "tr",
  "th", "td", "hr", "strong", "em", "del",
]);

const ALLOWED_PROPERTIES = new Set([
  "color", "background-color", "font-family", "font-size", "font-weight",
  "font-style", "line-height", "letter-spacing", "text-align",
  "text-decoration", "margin", "margin-top", "margin-right", "margin-bottom",
  "margin-left", "padding", "padding-top", "padding-right", "padding-bottom",
  "padding-left", "border", "border-top", "border-right", "border-bottom",
  "border-left", "border-color", "border-style", "border-width",
  "border-radius", "max-width", "width", "height", "overflow-x",
  "white-space", "word-break", "list-style", "list-style-type",
  "border-collapse", "box-shadow",
]);

function validateSelector(selector) {
  if (!selector || selector.includes("[") || selector.includes("]") || /[.#@*+~]/.test(selector)) {
    return false;
  }

  const tags = selector
    .replace(/:hover|:focus-visible|:first-child|:last-child/g, "")
    .split(/\s*>\s*|\s+/)
    .filter(Boolean);

  return tags.length > 0 && tags.every((tag) => ALLOWED_TAGS.has(tag));
}

export function validateAndScopeMarkdownCss(css = "") {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const errors = [];

  if (!source) {
    return { css: "", scopedCss: "", errors: ["CSS cannot be empty."] };
  }

  if (source.length > 12000) errors.push("CSS must be 12,000 characters or fewer.");
  if (/@|url\s*\(|expression\s*\(|!important|javascript:/i.test(source)) {
    errors.push("Imports, URLs, expressions, at-rules, and !important are not allowed.");
  }

  const blocks = [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const remainder = source.replace(/([^{}]+)\{([^{}]*)\}/g, "").trim();
  if (!blocks.length || remainder) errors.push("CSS contains an invalid or nested rule.");

  const normalizedRules = [];
  const scopedRules = [];

  blocks.forEach(([, selectorText, declarationText]) => {
    const selectors = selectorText.split(",").map((selector) => selector.trim());
    if (!selectors.every(validateSelector)) {
      errors.push(`Unsupported selector: ${selectorText.trim()}`);
      return;
    }

    const declarations = declarationText
      .split(";")
      .map((declaration) => declaration.trim())
      .filter(Boolean);

    if (!declarations.length) {
      errors.push(`Rule has no declarations: ${selectorText.trim()}`);
      return;
    }

    const normalizedDeclarations = [];
    declarations.forEach((declaration) => {
      const separatorIndex = declaration.indexOf(":");
      const property = declaration.slice(0, separatorIndex).trim().toLowerCase();
      const value = declaration.slice(separatorIndex + 1).trim();

      if (separatorIndex < 1 || !ALLOWED_PROPERTIES.has(property)) {
        errors.push(`Unsupported property: ${property || declaration}`);
      } else if (!value || /[{}<>]|url\s*\(|expression\s*\(|javascript:/i.test(value)) {
        errors.push(`Unsafe value for ${property}.`);
      } else {
        normalizedDeclarations.push(`${property}: ${value}`);
      }
    });

    if (normalizedDeclarations.length === declarations.length) {
      const declarationBlock = normalizedDeclarations.join("; ");
      normalizedRules.push(`${selectors.join(", ")} { ${declarationBlock}; }`);
      scopedRules.push(
        `${selectors.map((selector) => `.develop-markdown ${selector}`).join(", ")} { ${declarationBlock}; }`
      );
    }
  });

  return {
    css: normalizedRules.join("\n"),
    scopedCss: scopedRules.join("\n"),
    errors: [...new Set(errors)],
  };
}

export async function fetchMarkdownTheme(signal) {
  const response = await fetch(`${API_URL}/api/settings/markdown-theme`, { signal });
  if (!response.ok) throw new Error("The Markdown theme service is unavailable.");
  const data = await response.json();
  return data.css || DEFAULT_MARKDOWN_CSS;
}

export async function saveMarkdownTheme(css, token) {
  const response = await fetch(`${API_URL}/api/settings/markdown-theme`, {
    method: "PUT",
    headers: authorizationHeaders(token, { "Content-Type": "application/json" }),
    body: JSON.stringify({ css }),
  });

  if (!response.ok) {
    const error = new Error(await getApiError(response, "Failed to save Markdown theme."));
    error.status = response.status;
    throw error;
  }

  return response.json();
}
