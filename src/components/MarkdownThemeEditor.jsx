import React, { useEffect, useMemo, useState } from "react";
import { LoaderCircle, RotateCcw, Save } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { DEFAULT_MARKDOWN_CSS, saveMarkdownTheme, validateAndScopeMarkdownCss } from "../lib/markdownTheme";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

const PREVIEW_MARKDOWN = `# Project heading

This is a preview of **bold text**, *emphasis*, and a [project link](https://example.com).

## A second heading

> A short quote that demonstrates the selected theme.

- Clear hierarchy
- Readable body copy
- Styled lists and links

\`\`\`js
const portfolio = "ready";
\`\`\`
`;

export default function MarkdownThemeEditor({ css, token, onChange, onUnauthorized }) {
  const [draft, setDraft] = useState(css);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const validation = useMemo(() => validateAndScopeMarkdownCss(draft), [draft]);

  useEffect(() => setDraft(css), [css]);

  const handleSave = async () => {
    setError("");
    setMessage("");
    if (validation.errors.length) return;

    setSaving(true);
    try {
      const result = await saveMarkdownTheme(validation.css, token);
      const savedCss = result.css || validation.css;
      setDraft(savedCss);
      onChange(savedCss);
      setMessage("Markdown theme saved.");
    } catch (saveError) {
      if (saveError.status === 401) onUnauthorized();
      else setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Markdown theme CSS</CardTitle>
          <CardDescription>
            Styles are scoped to supported Markdown elements. Unsafe selectors and properties are rejected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="Markdown theme CSS"
            className="min-h-[520px] font-mono text-xs leading-6"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setMessage("");
              setError("");
            }}
            spellCheck={false}
          />
          {validation.errors.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>Theme validation failed</AlertTitle>
              <AlertDescription>
                <ul className="list-disc space-y-1 pl-5">
                  {validation.errors.map((validationError) => <li key={validationError}>{validationError}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Theme was not saved</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {message && <Alert><AlertDescription>{message}</AlertDescription></Alert>}
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleSave} disabled={saving || validation.errors.length > 0}>
              {saving ? <LoaderCircle className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? "Saving..." : "Save theme"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setDraft(DEFAULT_MARKDOWN_CSS)}>
              <RotateCcw size={16} />
              Reset default
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live preview</CardTitle>
          <CardDescription>The saved theme will apply to every develop detail page.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-zinc-800 bg-[#111111] p-6 md:p-8">
            <MarkdownRenderer css={validation.errors.length ? css : draft}>{PREVIEW_MARKDOWN}</MarkdownRenderer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
