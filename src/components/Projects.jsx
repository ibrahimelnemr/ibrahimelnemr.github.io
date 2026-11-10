import { useEffect, useState } from "react";
import snapshot from "../data/projects.json";
import { profile, projectDetails } from "../data/profile.js";
import {
  filterProjects,
  languageColors,
  PROJECTS_URL,
  selectProjects,
} from "../lib/projects.js";
import Icon from "./Icon.jsx";

export default function Projects() {
  const [projects, setProjects] = useState(snapshot);
  const [filter, setFilter] = useState("All");
  const [live, setLive] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetch(PROJECTS_URL, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub is temporarily unavailable");
        return response.json();
      })
      .then((data) => {
        const next = selectProjects(data);
        if (next.length) {
          setProjects(next);
          setLive(true);
        }
      })
      .catch(() => {
        /* The bundled public-project snapshot stays available offline. */
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const languages = [
    "All",
    ...new Set(projects.map((project) => project.language).filter(Boolean)),
  ];
  const activeFilter = languages.includes(filter) ? filter : "All";
  const visible = filterProjects(projects, activeFilter);

  return (
    <section
      className="section projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-top reveal">
        <span className="eyebrow">02 / THE WORKBENCH</span>
        <span className="section-aside">
          Small experiments. New possibilities.
        </span>
      </div>
      <div className="section-heading reveal">
        <h2 id="projects-title">
          Still curious.
          <br />
          <em>Still building.</em>
        </h2>
        <a
          className="text-link"
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore my GitHub <Icon name="diagonal" size={18} />
        </a>
      </div>
      <div className="project-toolbar reveal">
        <div
          className="filters"
          role="group"
          aria-label="Filter repositories by language"
        >
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              className={activeFilter === language ? "filter active" : "filter"}
              aria-pressed={activeFilter === language}
              onClick={() => setFilter(language)}
            >
              {language === "All" ? "All projects" : language}
            </button>
          ))}
        </div>
        <span className="github-status">
          <span className={live ? "status-dot" : "status-dot neutral"} />
          {live ? "Fresh from GitHub" : "Recent public projects"}
        </span>
      </div>
      <div className="repository-grid" aria-live="polite" aria-atomic="false">
        {visible.map((repo, index) => (
          <a
            className="repository-card"
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="repository-top">
              <span className="repository-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon name="diagonal" />
            </div>
            <h3>
              {projectDetails[repo.name]?.title ||
                repo.name.replaceAll("-", " ")}
            </h3>
            <p>
              {repo.description ||
                projectDetails[repo.name]?.description ||
                "Explore the source code and project details on GitHub."}
            </p>
            <div className="repository-meta">
              <span>
                <i
                  style={{
                    backgroundColor:
                      languageColors[repo.language] || "var(--muted)",
                  }}
                />
                {repo.language || "Source code"}
              </span>
              <span className="repository-stars">
                <Icon name="star" size={14} />
                {repo.stargazers_count || 0}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
