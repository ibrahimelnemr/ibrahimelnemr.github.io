import { render, screen } from "@testing-library/react";
import axios from "axios";
import Project from "./Project";

jest.mock("axios");
jest.mock("./ProjectCard", () => ({ value }) => <div>{value.name}</div>);

test("shows recent original projects and includes a specified project only once", async () => {
  axios.get.mockImplementation((url) => Promise.resolve({
    data: url.includes("/users/") ? [
      { name: "forked-project", fork: true },
      { name: "archived-project", archived: true },
      { name: "ibrahimelnemr" },
      { name: "ibrahimelnemr.github.io" },
      { name: "featured-project" },
      { name: "recent-project" },
      { name: "older-project" },
    ] : { name: "featured-project" },
  }));

  render(<Project heading="Recent Projects" username="ibrahimelnemr" length={1} specfic={["featured-project"]} />);

  expect(await screen.findByText("recent-project")).toBeInTheDocument();
  expect(screen.getAllByText("featured-project")).toHaveLength(1);
  for (const name of ["forked-project", "archived-project", "ibrahimelnemr", "ibrahimelnemr.github.io", "older-project"]) {
    expect(screen.queryByText(name)).not.toBeInTheDocument();
  }
});
