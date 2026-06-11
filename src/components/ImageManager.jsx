import React, { useEffect, useState } from "react";
import { ExternalLink, LoaderCircle, Trash2 } from "lucide-react";
import DevelopEditDialog from "./DevelopEditDialog";
import { API_URL, authorizationHeaders, getApiError } from "../lib/api";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ImageManager({ contentType, endpoint, token, onUnauthorized, markdownCss }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch(`${API_URL}${endpoint}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(await getApiError(response, `Failed to fetch ${contentType} items.`));
        return response.json();
      })
      .then(setItems)
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(fetchError.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [contentType, endpoint]);

  const handleDelete = async (item) => {
    setDeletingId(item._id);
    setError("");

    try {
      const body = { id: String(item._id) };
      if (item.publicId) body.publicId = String(item.publicId);

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: authorizationHeaders(token, { "Content-Type": "application/json" }),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const deleteError = new Error(await getApiError(response, "Delete request failed."));
        deleteError.status = response.status;
        throw deleteError;
      }

      setItems((current) => current.filter((currentItem) => currentItem._id !== item._id));
    } catch (deleteError) {
      if (deleteError.status === 401) onUnauthorized();
      else setError(deleteError.message);
    } finally {
      setDeletingId("");
    }
  };

  const handleUpdated = (updatedItem) => {
    setItems((current) => current.map((item) => item._id === updatedItem._id ? updatedItem : item));
  };

  const renderContent = (item) => {
    const imageUrl = item.photo || item.image;
    return (
      <>
        {imageUrl && <img src={imageUrl} alt={item.title || item.text || contentType} className="h-48 w-full object-cover" loading="lazy" />}
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle>{item.title || `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} item`}</CardTitle>
            <Badge>{new Date(item.createdAt).toLocaleDateString()}</Badge>
          </div>
          <CardDescription className="line-clamp-3">
            {contentType === "develop" ? (item.shortText ?? "") : (item.text || item.linkText || "Uploaded content")}
          </CardDescription>
        </CardHeader>
        {item.linkText && (
          <CardContent>
            <a href={item.linkText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover">
              Open link <ExternalLink size={14} />
            </a>
          </CardContent>
        )}
      </>
    );
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Manage {contentType}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Review and remove existing public entries.</p>
      </div>

      {error && <Alert variant="destructive"><AlertTitle>Content manager error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => <Skeleton key={item} className="h-80" />)}
        </div>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No {contentType} items found.</CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              {renderContent(item)}
              <CardFooter className="flex-col gap-3">
                {contentType === "develop" && (
                  <DevelopEditDialog
                    item={item}
                    token={token}
                    markdownCss={markdownCss}
                    onUpdated={handleUpdated}
                    onUnauthorized={onUnauthorized}
                  />
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full" disabled={deletingId === item._id}>
                      {deletingId === item._id ? <LoaderCircle className="animate-spin" size={16} /> : <Trash2 size={16} />}
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this {contentType} item?</AlertDialogTitle>
                      <AlertDialogDescription>This action permanently removes the entry and its associated media.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item)}>Delete item</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
