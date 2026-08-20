/** Build the dark-green highlights bar from basic project fields when none are saved. */
export function buildHighlights(project) {
  if (project?.highlights?.length) return project.highlights;

  const items = [];
  const projectType = project?.tags?.[0] || project?.category;
  if (projectType) {
    items.push({ icon: "🏠", label: "Project Type", value: projectType });
  }
  if (project?.area) {
    items.push({ icon: "📐", label: "Total Area", value: project.area });
  }
  if (project?.year) {
    items.push({ icon: "🗓️", label: "Completed", value: project.year });
  }
  if (project?.duration) {
    items.push({ icon: "⏱️", label: "Duration", value: project.duration });
  }
  if (project?.location) {
    const loc = project.location
      .replace(/,\s*Maharashtra$/i, ", MH")
      .replace(/\bMaharashtra\b/i, "MH");
    items.push({ icon: "📍", label: "Location", value: loc });
  }

  const style = project?.tags?.[1] || project?.budget;
  if (style) {
    items.push({ icon: "✨", label: "Style", value: style });
  } else if (project?.status) {
    items.push({ icon: "✨", label: "Status", value: project.status });
  }

  return items;
}
