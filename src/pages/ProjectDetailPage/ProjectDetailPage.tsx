import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useLocation,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useData } from "../../contexts/DataContext";
import { timeSince } from "../../utils/timeFormat";

interface HomeProps extends RouteComponentProps<any>, React.Props<any> {}
interface LocationState {
  reviewMode: boolean;
}

const ProjectDetailPage: React.FC<HomeProps> = (props: HomeProps) => {
  const { state } = useLocation<LocationState>();

  let { issueId } = useParams();
  const { data } = useData();
  let nextProject: number | null = 0;
  let prevProject: number | null = 0;
  const currProject =
    data?.allProjects.find((p) => p.node.number == issueId) || null;

  data?.allProjects.forEach((p, i) => {
    if (p.node.number === currProject?.node.number) {
      nextProject = data?.allProjects.slice(0).reverse()[i - 1]
        ? data?.allProjects[i - 1].node.number
        : null;
      prevProject = data?.allProjects.slice(0).reverse()[i + 1]
        ? data?.allProjects[i + 1].node.number
        : null;
    }
  });

  const reviewMode = !!state?.reviewMode;

  function LinkRenderer(props: any) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }

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
    <div className="my-8 container px-4 md:px-0 mx-auto">
      <div className="rounded-lg shadow-md bg-white dark:bg-black mb-4 p-4 ">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row items-center ">
            <Link to={`/dev/${currProject?.node.author.login}`}>
              <img
                className="h-16 w-16 rounded-full mx-auto mr-6"
                src={currProject?.node.author.avatarUrl}
                alt=""
              />
            </Link>
            <div>
              <div className="text-xl">
                <Link to={`dev/${currProject?.node.author.login}`}>
                  {currProject?.node.author.name || currProject?.node.author.id}
                </Link>
              </div>
              <a
                className="block no-underline hover:underline focus:text-gray-900 hover:text-gray-900 text-sm text-indigo-800"
                href={currProject?.node.author.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{currProject?.node.author.login}
              </a>
              {currProject?.node.labels.edges.find(
                (label) => label.node.name === "the finalist"
              ) && (
                <span className="inline-block bg-indigo-800 text-white text-xs px-2 rounded-full uppercase font-semibold tracking-wide align-bottom">
                  Finalist
                </span>
              )}
            </div>
          </div>
          {reviewMode && (
            <div>
              {prevProject && (
                <Link
                  to={{
                    pathname: `/submission/${prevProject}`,
                    state: { reviewMode: true },
                  }}
                  className="inline-block mx-2 text-sm px-4 py-2 border rounded text-indigo-800 border-indigo-800 hover:border-transparent hover:text-white hover:bg-indigo-800  mt-4 lg:mt-0"
                >
                  Previous Project
                </Link>
              )}
              {nextProject && (
                <Link
                  to={{
                    pathname: `/submission/${nextProject}`,
                    state: { reviewMode: true },
                  }}
                  className="inline-block mx-2 text-sm px-4 py-2 border rounded text-indigo-800 border-indigo-800 hover:border-transparent hover:text-white hover:bg-indigo-800  mt-4 lg:mt-0"
                >
                  Next Project
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="border rounded my-4 p-4 bg-white dark:bg-black shadow-md">
          <div className="md:flex justify-between items-center mb-6">
            <div className="text-xl font-bold">{currProject?.node.title}</div>
            {currProject?.node.createdAt && (
              <div className="text-sm text-gray-600 ">
                {timeSince(new Date(currProject.node.createdAt))}
              </div>
            )}
          </div>
          {currProject?.node.body && (
            <ReactMarkdown
              className="text-gray-800 text-base formatted"
              source={currProject?.node.body.replace(
                /(?:\r\n|\r|\n)/g,
                "<br />"
              )}
              escapeHtml={false}
              renderers={{ link: LinkRenderer }}
            />
          )}
        </div>
      </div>
      <div id="inject-comments-for-uterances"></div>
    </div>
  );
};

export default withRouter(ProjectDetailPage);
