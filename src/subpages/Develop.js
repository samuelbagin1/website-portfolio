import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { API_URL, getApiError } from "../lib/api";
import { getDevelopSlug } from "../lib/develop";

export default function Develop() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/api/develop`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(await getApiError(response, "Failed to load development projects."));
        return response.json();
      })
      .then(setProjects)
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(fetchError.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-[#FEFEFA]">
      <Navbar />
      <main className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-32 md:px-8">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#69eae4]">Development</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Projects and technical work</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-400">Open a project to read its full notes, implementation details, and links.</p>
        </header>

        {error && <Alert variant="destructive"><AlertTitle>Projects unavailable</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1, 2, 3].map((item) => <Skeleton key={item} className="h-[430px]" />)}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project._id} to={`/portfolio/develop/${getDevelopSlug(project)}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69eae4]">
                <Card className="h-full overflow-hidden border-zinc-800 bg-[#151515] transition duration-300 group-hover:-translate-y-1 group-hover:border-zinc-600">
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <ArrowUpRight className="shrink-0 text-zinc-500 transition group-hover:text-[#69eae4]" size={20} />
                    </div>
                    <CardDescription className="text-base leading-7">{project.shortText ?? ""}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm font-medium text-[#69eae4]">Read project details</CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
