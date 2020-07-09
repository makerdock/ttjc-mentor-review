import React from "react";
import { useData } from "../../contexts/DataContext";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { AllProject } from "../../utils/contracts";
const maxlimit = 160;
interface DevDetailsPageProps {}
const DevDetailsPage: React.FC<DevDetailsPageProps> = (props) => {
  let { username } = useParams();

  const { data } = useData();
  const currUser = data?.allUsers.find((user) => user.login === username);
  var userProject: AllProject[] = [];
  data?.allProjects.map((project) => {
    if (currUser?.projects.includes(project.node.id)) {
      userProject.push(project);
    }
  });
  return (
    <div className="my-8 container px-4 md:px-0 mx-auto">
      <div className="rounded-lg shadow-md bg-white mb-4 py-6 px-8 ">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row items-center">
            <Link to={`/dev/${currUser?.login}`}>
              <img
                className="h-16 w-16 md:h-16 md:w-16 rounded-full mx-auto md:mx-0 md:mr-6"
                src={currUser?.avatarUrl}
                alt=""
              />
            </Link>
            <div>
              <div className="text-xl">{currUser?.name || currUser?.id}</div>
              <a
                className="block no-underline hover:underline focus:text-gray-900 hover:text-gray-900 text-sm text-indigo-800"
                href={currUser?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{currUser?.login}
              </a>
              {currUser?.isFinalist && (
                <span className="inline-block bg-indigo-800 text-white text-xs px-2 rounded-full uppercase font-semibold tracking-wide align-bottom">
                  Finalist
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-10 text-lg text-gray-600 mb-2">Submissions</h2>
      <div className="card-grid">
        {userProject &&
          Object.values(userProject).map((project) => (
            <Link
              key={project.node.id}
              to={{
                pathname: `/submission/${project.node.number}`,
                state: { reviewMode: false },
              }}
              className="rounded shadow-md p-6 bg-white flex justify-between flex-col"
            >
              <div>
                {!!project.node.title?.length && (
                  <div className="text-xl font-bold mb-4">
                    {project.node.title}
                  </div>
                )}
                <ReactMarkdown
                  className="text-sm text-gray-600 formatted"
                  escapeHtml={false}
                  source={
                    project.node.body.length > maxlimit
                      ? project.node.body
                          .replace(/(?:\r\n|\r|\n)/g, "<br />")
                          .substring(0, maxlimit - 3) + "..."
                      : project.node.body.replace(/(?:\r\n|\r|\n)/g, "<br />")
                  }
                />
              </div>
              <div className="flex mt-4 items-center">
                <img
                  src={project.node.author.avatarUrl}
                  alt={project.node.author.name || project.node.author.login}
                  className="h-8 w-8 md:h-8 md:w-8 rounded-full mx-auto md:mx-0 md:mr-6"
                />
                <div className="text-base flex-1">
                  {project.node.author.name || project.node.author.login}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DevDetailsPage;
