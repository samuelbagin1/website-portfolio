import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Navbar from "../components/Navbar";
import Seo, { createWebPageSchema, getAbsoluteUrl } from "../components/Seo";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import useMarkdownTheme from "../hooks/useMarkdownTheme";
import { API_URL, getApiError } from "../lib/api";
import { getDevelopSlug, getShortId } from "../lib/develop";

export default function DevelopDetailed() {
  const { slugId = "" } = useParams();
  const navigate = useNavigate();
  const { css } = useMarkdownTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const shortId = getShortId(slugId);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/api/develop`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(await getApiError(response, "Failed to load project details."));
        return response.json();
      })
      .then(setProjects)
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(fetchError.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const matches = useMemo(
    () => projects.filter((project) => project._id.toLowerCase().startsWith(shortId)),
    [projects, shortId]
  );
  const project = matches.length === 1 ? matches[0] : null;
  const invalidProject = !loading && !error && (!shortId || matches.length !== 1);
  const canonicalPath = project
    ? `/portfolio/develop/${getDevelopSlug(project)}`
    : `/portfolio/develop/${slugId}`;
  const seoTitle = project ? `${project.title} | Samuel Bagin` : "Development Project | Samuel Bagin";
  const seoDescription = project?.shortText || "Read a software project case study and technical notes by Samuel Bagin.";
  const projectSchema = useMemo(() => {
    if (!project) return null;

    const page = createWebPageSchema({
      path: canonicalPath,
      name: seoTitle,
      description: seoDescription,
      type: "WebPage",
      image: project.image,
    });
    delete page["@context"];

    return {
      "@context": "https://schema.org",
      "@graph": [
        page,
        {
          "@type": "CreativeWork",
          "@id": `${getAbsoluteUrl(canonicalPath)}#project`,
          name: project.title,
          description: seoDescription,
          url: getAbsoluteUrl(canonicalPath),
          image: project.image,
          creator: {
            "@type": "Person",
            name: "Samuel Bagin",
            url: getAbsoluteUrl("/"),
          },
          ...(project.linkText ? { sameAs: project.linkText } : {}),
        },
      ],
    };
  }, [canonicalPath, project, seoDescription, seoTitle]);

  useEffect(() => {
    if (!project) return;
    const canonicalSlug = getDevelopSlug(project);
    if (slugId !== canonicalSlug) navigate(`/portfolio/develop/${canonicalSlug}`, { replace: true });
  }, [navigate, project, slugId]);

  let content;
  if (loading) {
    content = (
      <div className="space-y-8">
        <Skeleton className="h-[55vh] min-h-80 w-full" />
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  } else if (error) {
    content = <Alert variant="destructive"><AlertTitle>Project unavailable</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;
  } else if (!shortId || matches.length === 0) {
    content = <Alert><AlertTitle>Project not found</AlertTitle><AlertDescription>The project URL is invalid or the project no longer exists.</AlertDescription></Alert>;
  } else if (matches.length > 1) {
    content = <Alert variant="destructive"><AlertTitle>Ambiguous project URL</AlertTitle><AlertDescription>More than one project matches this short identifier.</AlertDescription></Alert>;
  } else {
    content = (
      <article>
        <div className="relative mb-10 h-[55vh] min-h-80 overflow-hidden rounded-2xl border border-zinc-800">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-4xl p-6 md:p-10">
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{project.title}</h1>
            {project.shortText && <p className="mt-4 hidden max-w-2xl text-base leading-7 text-zinc-300 sm:block md:text-lg">{project.shortText}</p>}
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <MarkdownRenderer css={css}>{project.text}</MarkdownRenderer>
          <div className="mt-12 flex justify-center border-t border-zinc-800 pt-8">
            <Button asChild size="lg" className="group/view-project h-12 rounded-full text-base text-zinc-950 active:scale-[0.98]">
              <a href={project.linkText} target="_blank" rel="noopener noreferrer">
                View project
                <ArrowUpRight className="transition-transform duration-300 group-hover/view-project:-translate-y-0.5 group-hover/view-project:translate-x-0.5" size={17} />
              </a>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#FEFEFA]">
      <Seo
        title={invalidProject ? "Project not found | Samuel Bagin" : seoTitle}
        description={invalidProject ? "The requested development project could not be found." : seoDescription}
        path={canonicalPath}
        image={project?.image}
        type={project ? "article" : "website"}
        robots={invalidProject ? "noindex,nofollow,noarchive" : undefined}
        canonical={!invalidProject}
        schema={projectSchema}
      />
      <Navbar />
      <main className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-28 md:px-8">
        <Link to="/portfolio/develop" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft size={16} /> Back to development projects
        </Link>
        {content}
      </main>
      <Footer />
    </div>
  );
}
