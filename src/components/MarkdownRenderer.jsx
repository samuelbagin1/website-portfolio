import React from "react";
import Markdown from "markdown-to-jsx";
import { validateAndScopeMarkdownCss } from "../lib/markdownTheme";
import { cn } from "../lib/utils";

function SafeLink({ href = "", children, ...props }) {
  const isSafe = /^(https?:\/\/|mailto:|#|\/)/i.test(href);
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      {...props}
      href={isSafe ? href : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function SafeImage({ src = "", alt = "", ...props }) {
  const isSafe = /^(https?:\/\/|\/)/i.test(src);
  return isSafe ? <img {...props} src={src} alt={alt} loading="lazy" /> : null;
}

export default function MarkdownRenderer({ children = "", css, className }) {
  const { scopedCss } = validateAndScopeMarkdownCss(css);

  return (
    <>
      {scopedCss && <style>{scopedCss}</style>}
      <div className={cn("develop-markdown", className)}>
        <Markdown
          options={{
            disableParsingRawHTML: true,
            forceBlock: true,
            overrides: {
              a: SafeLink,
              img: SafeImage,
            },
          }}
        >
          {children}
        </Markdown>
      </div>
    </>
  );
}
