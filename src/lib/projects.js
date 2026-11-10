export const PROJECTS_URL =
  "https://api.github.com/users/ibrahimelnemr/repos?sort=pushed&direction=desc&per_page=100";

export function selectProjects(repositories, limit = 6) {
  if (!Array.isArray(repositories))
    throw new TypeError("Expected a repository list");
  return repositories
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        !repo.private &&
        repo.pushed_at &&
        !["ibrahimelnemr", "ibrahimelnemr.github.io"].includes(
          repo.name?.toLowerCase(),
        ),
    )
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, limit);
}

export function filterProjects(projects, language) {
  return language === "All"
    ? projects
    : projects.filter((project) => project.language === language);
}

export const languageColors = {
  HTML: "#df653d",
  Python: "#487cab",
  JavaScript: "#c4a62f",
  TypeScript: "#3478c6",
  Dart: "#26a8b5",
  Swift: "#ec704e",
  Java: "#ac7959",
  CSS: "#8957c7",
};
