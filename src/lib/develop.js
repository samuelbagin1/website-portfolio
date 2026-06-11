export function slugifyTitle(title = "") {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}

export function getDevelopSlug(project) {
  return `${slugifyTitle(project.title)}-${project._id.slice(0, 8)}`;
}

export function getShortId(slugId = "") {
  return slugId.match(/-([a-fA-F0-9]{8})$/)?.[1]?.toLowerCase() || "";
}
