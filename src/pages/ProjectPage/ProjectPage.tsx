import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import ReactMarkdown from "react-markdown";

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
      className={`w-36 text-center cursor-pointer p-4 ${
        active ? "border-indigo-800 border rounded-md" : ""
      }`}
      onClick={handleClick}
    >
      <span className="block text-3xl mb-2">{count}</span>
      <span className="text-gray-600 text-sm">{label}</span>
    </div>
  );
};

type ProjectFilterType = "all" | "pending" | "done";
const ProjectPage: React.FC = () => {
  const { data } = useData();
  const [currentFilter, setCurrentFilter] = useState<ProjectFilterType>("all");

  return (
    <div className="container mx-auto my-8">
      <div className="rounded overflow-hidden shadow-md px-4 py-8 bg-white">
        <div className="flex justify-around">
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
                    source={
                      project.body.length > maxlimit
                        ? project.body.substring(0, maxlimit - 3) + "..."
                        : project.body
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
                    source={
                      project.body.length > maxlimit
                        ? project.body.substring(0, maxlimit - 3) + "..."
                        : project.body
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
                    source={
                      project.body.length > maxlimit
                        ? project.body.substring(0, maxlimit - 3) + "..."
                        : project.body
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
