import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import ReactMarkdown from "react-markdown";
import { AllProject } from "../../utils/contracts";

const maxlimit = 160;

interface FilterTabProps {
  onClick: () => void;
  label: string;
  count: number;
  active: boolean;
}
const FilterTab: React.FC<FilterTabProps> = ({
  count,
  onClick: handleClick,
  label,
  active,
}) => {
  return (
    <div
      className={`w-full text-center px-8 py-8 cursor-pointer p-4 ${
        active ? "border-indigo-400 bg-indigo-100 border rounded-md" : ""
      }`}
      onClick={handleClick}
    >
      <span className="block text-3xl mb-2">{count}</span>
      <span className="text-gray-600 text-sm">{label}</span>
    </div>
  );
};

type ProjectFilterType = "all" | "pending" | "done" | "finalist";
const ProjectPage: React.FC = () => {
  const { data } = useData();
  const [currentFilter, setCurrentFilter] = useState<ProjectFilterType>("all");

  let allFinalistProject: AllProject[] = [];
  data?.allProjects.map((project) => {
    if (project.labels.edges.length > 0) {
      project.labels.edges.map((label) => {
        if (label.node.name === "the finalist") {
          allFinalistProject.push(project);
        }
      });
    }
  });
  return (
    <div className="container mx-auto my-8">
      <div className="rounded overflow-hidden shadow-md bg-white">
        <div className="flex justify-evenly">
          <FilterTab
            active={currentFilter == "all"}
            onClick={() => setCurrentFilter("all")}
            count={
              (data?.allProjects && Object.keys(data?.allProjects).length) || 0
            }
            label="Total Submissions"
          />
          <FilterTab
            active={currentFilter == "pending"}
            onClick={() => setCurrentFilter("pending")}
            count={
              (data?.allNotReviewedProjects &&
                Object.keys(data?.allNotReviewedProjects).length) ||
              0
            }
            label="Pending for Approval"
          />
          <FilterTab
            active={currentFilter == "done"}
            onClick={() => setCurrentFilter("done")}
            count={
              (data?.allReviewedProjects &&
                Object.keys(data?.allReviewedProjects).length) ||
              0
            }
            label="Approved Submissions"
          />
          <FilterTab
            active={currentFilter == "finalist"}
            onClick={() => setCurrentFilter("finalist")}
            count={(allFinalistProject && allFinalistProject.length) || 0}
            label="Finalist Submissions"
          />
        </div>
      </div>

      <div
        // className="flex flex-wrap lg:-mx-4 mt-6"
        className="card-grid mt-6"
      >
        {currentFilter == "all" &&
          data?.allProjects &&
          Object.values(data?.allProjects)
            .slice(0)
            .reverse()
            .map((project) => (
              <Link
                key={project.id}
                to={{
                  pathname: `/submission/${project.number}`,
                  state: { reviewMode: false },
                }}
                className="rounded shadow-md px-6 py-6 bg-white w-full flex justify-between flex-col"
              >
                <div>
                  {!!project.title?.length && (
                    <div className="text-xl font-bold mb-4">
                      {project.title}
                    </div>
                  )}
                  <ReactMarkdown
                    className="text-sm text-gray-600 formatted"
                    escapeHtml={false}
                    source={
                      project.body.length > maxlimit
                        ? project.body
                            .replace(/(?:\r\n|\r|\n)/g, "<br />")
                            .substring(0, maxlimit - 3) + "..."
                        : project.body.replace(/(?:\r\n|\r|\n)/g, "<br />")
                    }
                  />
                </div>
                <div className="flex mt-4 items-center">
                  <img
                    src={project.author.avatarUrl}
                    alt={project.author.name || project.author.login}
                    className="h-8 w-8 md:h-8 md:w-8 rounded-full mx-auto md:mx-0 md:mr-6"
                  />
                  <div className="text-base flex-1">
                    {project.author.name || project.author.login}
                  </div>
                </div>
              </Link>
            ))}

        {currentFilter == "pending" &&
          data?.allNotReviewedProjects &&
          Object.values(data?.allNotReviewedProjects)
            .slice(0)
            .reverse()
            .map((project) => (
              <Link
                key={project.id}
                to={{
                  pathname: `/submission/${project.number}`,
                  state: { reviewMode: false },
                }}
                className="rounded shadow-md px-6 py-6 bg-white w-full flex justify-between flex-col"
              >
                <div>
                  {!!project.title?.length && (
                    <div className="text-xl font-bold mb-4">
                      {project.title}
                    </div>
                  )}
                  <ReactMarkdown
                    className="text-sm text-gray-600 formatted"
                    escapeHtml={false}
                    source={
                      project.body.length > maxlimit
                        ? project.body
                            .replace(/(?:\r\n|\r|\n)/g, "<br />")
                            .substring(0, maxlimit - 3) + "..."
                        : project.body.replace(/(?:\r\n|\r|\n)/g, "<br />")
                    }
                  />
                </div>
                <div className="flex mt-4 items-center">
                  <img
                    src={project.author.avatarUrl}
                    alt={project.author.name || project.author.login}
                    className="h-8 w-8 md:h-8 md:w-8 rounded-full mx-auto md:mx-0 md:mr-6"
                  />
                  <div className="text-base flex-1">
                    {project.author.name || project.author.login}
                  </div>
                </div>
              </Link>
            ))}
        {currentFilter == "done" &&
          data?.allReviewedProjects &&
          Object.values(data?.allReviewedProjects)
            .slice(0)
            .reverse()
            .map((project) => (
              <Link
                key={project.id}
                to={{
                  pathname: `/submission/${project.number}`,
                  state: { reviewMode: false },
                }}
                className="rounded shadow-md px-6 py-6 bg-white w-full flex justify-between flex-col"
              >
                <div>
                  {!!project.title?.length && (
                    <div className="text-xl font-bold mb-4">
                      {project.title}
                    </div>
                  )}

                  <ReactMarkdown
                    className="text-sm text-gray-600 formatted"
                    escapeHtml={false}
                    source={
                      project.body.length > maxlimit
                        ? project.body
                            .replace(/(?:\r\n|\r|\n)/g, "<br />")
                            .substring(0, maxlimit - 3) + "..."
                        : project.body.replace(/(?:\r\n|\r|\n)/g, "<br />")
                    }
                  />
                </div>
                <div className="flex mt-4 items-center">
                  <img
                    src={project.author.avatarUrl}
                    alt={project.author.name || project.author.login}
                    className="h-8 w-8 md:h-8 md:w-8 rounded-full mx-auto md:mx-0 md:mr-6"
                  />
                  <div className="text-base flex-1">
                    {project.author.name || project.author.login}
                  </div>
                </div>
              </Link>
            ))}
        {currentFilter == "finalist" &&
          allFinalistProject &&
          allFinalistProject
            .slice(0)
            .reverse()
            .map((project) => (
              <Link
                key={project.id}
                to={{
                  pathname: `/submission/${project.number}`,
                  state: { reviewMode: false },
                }}
                className="rounded shadow-md px-6 py-6 bg-white w-full flex justify-between flex-col"
              >
                <div>
                  {!!project.title?.length && (
                    <div className="text-xl font-bold mb-4">
                      {project.title}
                    </div>
                  )}

                  <ReactMarkdown
                    className="text-sm text-gray-600 formatted"
                    escapeHtml={false}
                    source={
                      project.body.length > maxlimit
                        ? project.body
                            .replace(/(?:\r\n|\r|\n)/g, "<br />")
                            .substring(0, maxlimit - 3) + "..."
                        : project.body.replace(/(?:\r\n|\r|\n)/g, "<br />")
                    }
                  />
                </div>
                <div className="flex mt-4 items-center">
                  <img
                    src={project.author.avatarUrl}
                    alt={project.author.name || project.author.login}
                    className="h-8 w-8 md:h-8 md:w-8 rounded-full mx-auto md:mx-0 md:mr-6"
                  />
                  <div className="text-base flex-1">
                    {project.author.name || project.author.login}
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ProjectPage;
