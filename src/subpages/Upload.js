import React, { useEffect, useState } from "react";
import { LogOut, ShieldCheck } from "lucide-react";
import AdminLogin from "../components/AdminLogin";
import ImageManager from "../components/ImageManager";
import ImageUploadForm from "../components/ImageUploadForm";
import MarkdownThemeEditor from "../components/MarkdownThemeEditor";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import useMarkdownTheme from "../hooks/useMarkdownTheme";
import { clearAuthSession, getAuthSession } from "../lib/auth";

const CONTENT_TYPES = [
  { id: "photo", label: "Photo", endpoint: "/api/photo", fields: ["text", "photo"] },
  { id: "graphic", label: "Graphic", endpoint: "/api/graphic", fields: ["image"] },
  { id: "develop", label: "Develop", endpoint: "/api/develop", fields: ["title", "shortText", "text", "linkText", "image"] },
  { id: "video", label: "Video", endpoint: "/api/video", fields: ["linkText"] },
];

export default function Upload() {
  const [session, setSession] = useState(() => getAuthSession());
  const [activeType, setActiveType] = useState("photo");
  const [refreshKey, setRefreshKey] = useState(0);
  const { css: markdownCss, setCss: setMarkdownCss } = useMarkdownTheme();

  const logout = () => {
    clearAuthSession();
    setSession(null);
  };

  useEffect(() => {
    if (!session) return undefined;
    const remaining = session.expiresAt - Date.now();
    if (remaining <= 0) {
      logout();
      return undefined;
    }
    const timer = window.setTimeout(logout, remaining);
    return () => window.clearTimeout(timer);
  }, [session]);

  if (!session) return <AdminLogin onLogin={setSession} />;

  const currentType = CONTENT_TYPES.find((type) => type.id === activeType);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <header className="mb-8 flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              <ShieldCheck size={16} /> Authenticated admin
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Content management</h1>
            <p className="mt-2 text-muted-foreground">Upload portfolio entries and control Markdown presentation.</p>
          </div>
          <Button variant="outline" onClick={logout}><LogOut size={16} /> Logout</Button>
        </header>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="theme">Markdown theme</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8">
            <Tabs value={activeType} onValueChange={(value) => {
              setActiveType(value);
              setRefreshKey((key) => key + 1);
            }}>
              <TabsList className="mb-6 h-auto flex-wrap">
                {CONTENT_TYPES.map((type) => <TabsTrigger key={type.id} value={type.id}>{type.label}</TabsTrigger>)}
              </TabsList>
            </Tabs>

            <ImageUploadForm
              contentType={activeType}
              endpoint={currentType.endpoint}
              fields={currentType.fields}
              markdownCss={markdownCss}
              token={session.token}
              onUnauthorized={logout}
              onUploadSuccess={() => setRefreshKey((key) => key + 1)}
            />
            <ImageManager
              key={`${activeType}-${refreshKey}`}
              contentType={activeType}
              endpoint={currentType.endpoint}
              token={session.token}
              markdownCss={markdownCss}
              onUnauthorized={logout}
            />
          </TabsContent>

          <TabsContent value="theme">
            <MarkdownThemeEditor css={markdownCss} token={session.token} onChange={setMarkdownCss} onUnauthorized={logout} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
