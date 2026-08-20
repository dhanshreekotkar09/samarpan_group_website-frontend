export const SITE_NAME = "Samarpan Group";

/** Set browser tab title: "Page Name – Samarpan Group" */
export function setPageTitle(pageName) {
  document.title = pageName ? `${pageName} – ${SITE_NAME}` : SITE_NAME;
}

const ROUTE_TITLES = {
  "/": "",
  "/about": "About Us",
  "/projects": "Projects",
  "/contact": "Contact",
  "/admin/login": "Admin Login",
  "/admin/projects": "Admin Projects",
  "/admin/projects/new": "New Project",
};

export function titleForPath(pathname) {
  if (pathname.startsWith("/admin/projects/") && pathname !== "/admin/projects/new") {
    return "Edit Project";
  }
  if (/^\/projects\/[^/]+$/.test(pathname)) {
    return null; // set dynamically from project data
  }
  return ROUTE_TITLES[pathname] ?? null;
}
