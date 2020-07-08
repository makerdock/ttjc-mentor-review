import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import ReactMarkdown from "react-markdown";

type ProjectFilterType = "all" | "pending" | "done";
const ProjectPage: React.FC = () => {
  const { data } = useData();
  const [currentFilter, setCurrentFilter] = useState<ProjectFilterType>("all");

  return (
    <div className="container mx-auto my-8">
      <div className="rounded overflow-hidden shadow-md px-4 py-8 bg-white">
        <div className="flex">
          <div className="w-1/3 text-center">
            <span className="block text-3xl mb-2">
              {(data?.allProjects && Object.keys(data?.allProjects).length) ||
                0}
            </span>
            <span className="text-gray-600 text-sm">Total Projects</span>
          </div>
          <div className="w-1/3 text-center">
            <span className="block text-3xl mb-2">
              {(data?.allNotReviewedProjects &&
                Object.keys(data?.allNotReviewedProjects).length) ||
                0}
            </span>
            <span className="text-gray-600 text-sm">Pending for Approval</span>
          </div>
          <div className="w-1/3 text-center">
            <span className="block text-3xl mb-2">
              {(data?.allReviewedProjects &&
                Object.keys(data?.allReviewedProjects).length) ||
                0}
            </span>
            <span className="text-gray-600 text-sm">Approved Projects</span>
          </div>
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
                  pathname: `/project/${project.number}`,
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
                    source={project.body}
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
                  pathname: `/project/${project.number}`,
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
                    source={project.body}
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
                  pathname: `/project/${project.number}`,
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
                    source={project.body}
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
