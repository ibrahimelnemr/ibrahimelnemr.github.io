import test from "node:test";
import assert from "node:assert/strict";
import { filterProjects, selectProjects } from "../src/lib/projects.js";

const repo = (name, fields = {}) => ({
  name,
  pushed_at: "2026-01-01T00:00:00Z",
  ...fields,
});

test("recent work excludes private, forked, archived, empty, profile and website repositories", () => {
  const result = selectProjects([
    repo("fork", { fork: true }),
    repo("archive", { archived: true }),
    repo("private", { private: true }),
    repo("empty", { pushed_at: null }),
    repo("IbrahimElNemr"),
    repo("ibrahimelnemr.github.io"),
    repo("original"),
  ]);
  assert.deepEqual(
    result.map((item) => item.name),
    ["original"],
  );
});

test("uses most recent code pushes, limits results, and does not mutate input", () => {
  const input = Array.from({ length: 8 }, (_, index) =>
    repo(`project-${index}`, { pushed_at: `2026-01-0${index + 1}T00:00:00Z` }),
  );
  assert.deepEqual(
    selectProjects(input, 3).map((item) => item.name),
    ["project-7", "project-6", "project-5"],
  );
  assert.equal(input[0].name, "project-0");
});

test("filters by language and restores all projects", () => {
  const projects = [
    repo("web", { language: "HTML" }),
    repo("ai", { language: "Python" }),
  ];
  assert.deepEqual(
    filterProjects(projects, "Python").map((item) => item.name),
    ["ai"],
  );
  assert.equal(filterProjects(projects, "All").length, 2);
  assert.equal(filterProjects(projects, "Swift").length, 0);
});

test("rejects malformed API payloads instead of displaying them", () => {
  assert.throws(
    () => selectProjects({ message: "API rate limit exceeded" }),
    TypeError,
  );
});
