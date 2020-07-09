import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useData } from "../../contexts/DataContext";
import { timeSince } from "../../utils/timeFormat";

interface ProjectDetailPageProps {}
const ProjectDetailPage: React.FC<ProjectDetailPageProps> = () => {
  let { issueId } = useParams();
  const { data } = useData();
  let nextProject: number | null = 0;
  let prevProject: number | null = 0;
  const currProject =
    data?.allProjects.find((p) => p.number == issueId) || null;
  data?.allProjects.forEach((p, i) => {
    if (p.number === currProject?.number) {
      nextProject = data?.allProjects.slice(0).reverse()[i - 1]
        ? data?.allProjects[i - 1].number
        : null;
      prevProject = data?.allProjects.slice(0).reverse()[i + 1]
        ? data?.allProjects[i + 1].number
        : null;
    }
  });

  useEffect(() => {
    const script = document.createElement("script");
    const anchor = document.getElementById("inject-comments-for-uterances");

    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");
    script.setAttribute("repo", "tanaypratap/teamtanay.jobchallenge.dev");
    script.setAttribute("issue-number", issueId);
    script.setAttribute("theme", "github-light");

    if (anchor) {
      while (anchor.firstChild) anchor.removeChild(anchor.firstChild);
      anchor.appendChild(script);
    }
  }, [issueId]);

  return (
    <div className="my-8 container mx-auto">
      <div className="rounded-lg shadow-md bg-white mb-4 py-6 px-8 ">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row items-center">
            <Link to={`/dev/${currProject?.author.login}`}>
              <img
                className="h-16 w-16 md:h-16 md:w-16 rounded-full mx-auto md:mx-0 md:mr-6"
                src={currProject?.author.avatarUrl}
                alt=""
              />
            </Link>
            <div>
              <div className="text-xl">
                <Link to={`dev/${currProject?.author.login}`}>
                  {currProject?.author.name || currProject?.author.id}
                </Link>
              </div>
              <a
                className="block no-underline hover:underline focus:text-gray-900 hover:text-gray-900 text-sm text-indigo-800"
                href={currProject?.author.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{currProject?.author.name}
              </a>
            </div>
          </div>
          <div>
            {prevProject && (
              <Link
                to={`/submission/${prevProject}`}
                className="inline-block mx-2 text-sm px-4 py-2 border rounded text-indigo-800 border-indigo-800 hover:border-transparent hover:text-white hover:bg-indigo-800  mt-4 lg:mt-0"
              >
                Previous Project
              </Link>
            )}
            {nextProject && (
              <Link
                to={`/submission/${nextProject}`}
                className="inline-block mx-2 text-sm px-4 py-2 border rounded text-indigo-800 border-indigo-800 hover:border-transparent hover:text-white hover:bg-indigo-800  mt-4 lg:mt-0"
              >
                Next Project
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="border rounded my-4 py-6 px-8  bg-white shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">{currProject?.title}</div>
            {currProject?.createdAt && (
              <div className="text-sm text-gray-600 ">
                {timeSince(new Date(currProject.createdAt))}
              </div>
            )}
          </div>
          {currProject?.body && (
            <ReactMarkdown
              className="text-gray-800 text-base formatted"
              source={currProject?.body.replace(/(?:\r\n|\r|\n)/g, "<br />")}
              escapeHtml={false}
            />
          )}
        </div>
      </div>
      <div id="inject-comments-for-uterances"></div>
    </div>
  );
};

export default ProjectDetailPage;
