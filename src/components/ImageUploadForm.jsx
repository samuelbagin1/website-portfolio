import React, { useEffect, useState } from "react";
import { LoaderCircle, UploadCloud } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { API_URL, authorizationHeaders, getApiError } from "../lib/api";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

const EMPTY_FORM = {
  text: "",
  shortText: "",
  title: "",
  linkText: "",
  photo: null,
  image: null,
};

export default function ImageUploadForm({ onUploadSuccess, contentType, endpoint, fields, token, onUnauthorized, markdownCss }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [fileKey, setFileKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormData(EMPTY_FORM);
    setFileKey((key) => key + 1);
    setError("");
    setSuccess(false);
  }, [contentType]);

  const updateField = (field, value) => setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      let response;

      if (contentType === "video") {
        response = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: authorizationHeaders(token, { "Content-Type": "application/json" }),
          body: JSON.stringify({ linkText: formData.linkText }),
        });
      } else {
        const body = new FormData();
        fields.forEach((field) => {
          if (formData[field] !== null) body.append(field, formData[field]);
        });

        response = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: authorizationHeaders(token),
          body,
        });
      }

      if (!response.ok) {
        const uploadError = new Error(await getApiError(response, `Failed to upload ${contentType}.`));
        uploadError.status = response.status;
        throw uploadError;
      }

      setSuccess(true);
      setFormData(EMPTY_FORM);
      setFileKey((key) => key + 1);
      onUploadSuccess();
    } catch (uploadError) {
      if (uploadError.status === 401) onUnauthorized();
      else setError(uploadError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</CardTitle>
        <CardDescription>Create a new public portfolio entry.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.includes("title") && (
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={(event) => updateField("title", event.target.value)} required />
            </div>
          )}

          {fields.includes("shortText") && (
            <div className="space-y-2">
              <Label htmlFor="shortText">Short summary</Label>
              <Textarea id="shortText" className="min-h-24" value={formData.shortText} onChange={(event) => updateField("shortText", event.target.value)} required />
              <p className="text-xs text-zinc-500">Displayed on the develop listing card.</p>
            </div>
          )}

          {fields.includes("text") && contentType === "develop" && (
            <div className="space-y-2">
              <Label htmlFor="text">Project body</Label>
              <Tabs defaultValue="write">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write">
                  <Textarea id="text" className="min-h-80 font-mono leading-6" value={formData.text} onChange={(event) => updateField("text", event.target.value)} required />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="min-h-80 rounded-3xl border border-zinc-800 bg-[#111111] p-6">
                    {formData.text ? <MarkdownRenderer css={markdownCss}>{formData.text}</MarkdownRenderer> : <p className="text-sm text-zinc-500">Write Markdown to preview it here.</p>}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {fields.includes("text") && contentType !== "develop" && (
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Textarea id="text" value={formData.text} onChange={(event) => updateField("text", event.target.value)} required />
            </div>
          )}

          {fields.includes("linkText") && (
            <div className="space-y-2">
              <Label htmlFor="linkText">{contentType === "video" ? "Video URL" : "Project URL"}</Label>
              <Input id="linkText" type="url" value={formData.linkText} onChange={(event) => updateField("linkText", event.target.value)} required />
            </div>
          )}

          {fields.includes("photo") && (
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input key={`photo-${fileKey}`} id="photo" type="file" accept="image/*" onChange={(event) => updateField("photo", event.target.files[0])} required />
            </div>
          )}

          {fields.includes("image") && (
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input key={`image-${fileKey}`} id="image" type="file" accept="image/*" onChange={(event) => updateField("image", event.target.files[0])} required />
            </div>
          )}

          {error && <Alert variant="destructive"><AlertTitle>Upload failed</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          {success && <Alert><AlertDescription>Upload completed successfully.</AlertDescription></Alert>}

          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" size={16} /> : <UploadCloud size={16} />}
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
