import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import ReactMarkdown from "react-markdown";
import { AllProject } from "../../utils/contracts";

const maxlimit = 160;

const ProjectCard: React.FC<AllProject> = ({ node }) => {
  return (
    <Link
      key={node.id}
      to={{
        pathname: `/submission/${node.number}`,
        state: { reviewMode: false },
      }}
      className="rounded shadow-md p-4 bg-white flex justify-between flex-col"
    >
      <div>
        {node.title?.length && (
          <div className="text-xl font-bold mb-4">{node.title}</div>
        )}
        <ReactMarkdown
          className="text-sm text-gray-600 formatted"
          escapeHtml={false}
          source={
            node.body.length > maxlimit
              ? node.body
                  .replace(/(?:\r\n|\r|\n)/g, "<br />")
                  .substring(0, maxlimit - 3) + "..."
              : node.body.replace(/(?:\r\n|\r|\n)/g, "<br />")
          }
        />
      </div>
      <div className="flex mt-4 items-center">
        <img
          src={node.author.avatarUrl}
          alt={node.author.name || node.author.login}
          className="h-8 w-8 rounded-full mr-6"
        />
        <div>
          <div className="text-base mr-2">
            {node.author.name || node.author.login}
          </div>
          {node.labels.edges.find(
            (label) => label.node.name === "the finalist"
          ) && (
            <span className="inline-block bg-indigo-800 text-white text-xs px-2 rounded-full uppercase font-semibold tracking-wide align-bottom">
              Finalist
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

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
    if (project.node.labels.edges.length > 0) {
      project.node.labels.edges.map((label) => {
        if (label.node.name === "the finalist") {
          allFinalistProject.push(project);
        }
      });
    }
  });
  return (
    <div className="container px-4 md:px-0 mx-auto my-8">
      <div className="rounded overflow-hidden shadow-md bg-white">
        <div className="md:flex justify-evenly">
          <FilterTab
            active={currentFilter === "all"}
            onClick={() => setCurrentFilter("all")}
            count={
              (data?.allProjects && Object.keys(data?.allProjects).length) || 0
            }
            label="Total Submissions"
          />
          <FilterTab
            active={currentFilter === "pending"}
            onClick={() => setCurrentFilter("pending")}
            count={
              (data?.allNotReviewedProjects &&
                Object.keys(data?.allNotReviewedProjects).length) ||
              0
            }
            label="Pending for Approval"
          />
          <FilterTab
            active={currentFilter === "done"}
            onClick={() => setCurrentFilter("done")}
            count={
              (data?.allReviewedProjects &&
                Object.keys(data?.allReviewedProjects).length) ||
              0
            }
            label="Approved Submissions"
          />
          <FilterTab
            active={currentFilter === "finalist"}
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
        {currentFilter === "all" &&
          data?.allProjects &&
          Object.values(data?.allProjects)
            .slice(0)
            .reverse()
            .map((project) => (
              <ProjectCard cursor={project.cursor} node={project.node} />
            ))}

        {currentFilter === "pending" &&
          data?.allNotReviewedProjects &&
          Object.values(data?.allNotReviewedProjects)
            .slice(0)
            .reverse()
            .map((project) => (
              <ProjectCard cursor={project.cursor} node={project.node} />
            ))}
        {currentFilter === "done" &&
          data?.allReviewedProjects &&
          Object.values(data?.allReviewedProjects)
            .slice(0)
            .reverse()
            .map((project) => (
              <ProjectCard cursor={project.cursor} node={project.node} />
            ))}
        {currentFilter === "finalist" &&
          allFinalistProject &&
          allFinalistProject.map((project) => (
            <ProjectCard cursor={project.cursor} node={project.node} />
          ))}
      </div>
    </div>
  );
};

export default ProjectPage;
