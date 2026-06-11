import React, { useEffect, useState } from "react";
import { ImagePlus, LoaderCircle, Pencil, Save } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { API_URL, authorizationHeaders, getApiError } from "../lib/api";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

function getInitialForm(item) {
  return {
    title: item.title || "",
    shortText: item.shortText || "",
    text: item.text || "",
    linkText: item.linkText || "",
    image: null,
  };
}

export default function DevelopEditDialog({ item, token, markdownCss, onUpdated, onUnauthorized }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(() => getInitialForm(item));
  const [fileKey, setFileKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormData(getInitialForm(item));
      setFileKey((key) => key + 1);
      setError("");
    }
  }, [item, open]);

  const updateField = (field, value) => setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const body = new FormData();
      body.append("id", String(item._id));
      body.append("title", formData.title);
      body.append("shortText", formData.shortText);
      body.append("text", formData.text);
      body.append("linkText", formData.linkText);
      if (formData.image) body.append("image", formData.image);

      const response = await fetch(`${API_URL}/api/develop`, {
        method: "PUT",
        headers: authorizationHeaders(token),
        body,
      });

      if (!response.ok) {
        const updateError = new Error(await getApiError(response, "Failed to update development project."));
        updateError.status = response.status;
        throw updateError;
      }

      const updatedItem = await response.json();
      onUpdated(updatedItem);
      setOpen(false);
    } catch (updateError) {
      if (updateError.status === 401) onUnauthorized();
      else setError(updateError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Pencil size={16} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit development project</DialogTitle>
          <DialogDescription>Update project content or optionally replace its image.</DialogDescription>
        </DialogHeader>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor={`edit-title-${item._id}`}>Title</Label>
            <Input id={`edit-title-${item._id}`} value={formData.title} onChange={(event) => updateField("title", event.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`edit-shortText-${item._id}`}>Short summary</Label>
            <Textarea id={`edit-shortText-${item._id}`} className="min-h-24" value={formData.shortText} onChange={(event) => updateField("shortText", event.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`edit-text-${item._id}`}>Project body</Label>
            <Tabs defaultValue="write">
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea id={`edit-text-${item._id}`} className="min-h-80 font-mono leading-6" value={formData.text} onChange={(event) => updateField("text", event.target.value)} required />
              </TabsContent>
              <TabsContent value="preview">
                <div className="min-h-80 rounded-3xl border border-border bg-background p-6">
                  <MarkdownRenderer css={markdownCss}>{formData.text}</MarkdownRenderer>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`edit-linkText-${item._id}`}>Project URL</Label>
            <Input id={`edit-linkText-${item._id}`} type="url" value={formData.linkText} onChange={(event) => updateField("linkText", event.target.value)} required />
          </div>

          <div className="grid gap-4 rounded-3xl border border-border bg-background p-4 md:grid-cols-[140px_1fr] md:items-center">
            <img src={item.image} alt={item.title} className="h-24 w-full rounded-2xl object-cover md:w-36" />
            <div className="space-y-2">
              <Label htmlFor={`edit-image-${item._id}`} className="flex items-center gap-2">
                <ImagePlus size={15} />
                Replace image
              </Label>
              <Input key={fileKey} id={`edit-image-${item._id}`} type="file" accept="image/*" onChange={(event) => updateField("image", event.target.files[0] || null)} />
              <p className="text-xs text-muted-foreground">Leave empty to keep the current image.</p>
            </div>
          </div>

          {error && <Alert variant="destructive"><AlertTitle>Update failed</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

          <DialogFooter>
            <Button type="submit" disabled={saving}>
              {saving ? <LoaderCircle className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
