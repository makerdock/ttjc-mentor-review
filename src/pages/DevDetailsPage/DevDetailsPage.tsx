import React from "react";
import { useData } from "../../contexts/DataContext";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { AllProject } from "../../utils/contracts";

interface DevDetailsPageProps {}
const DevDetailsPage: React.FC<DevDetailsPageProps> = (props) => {
  let { username } = useParams();

  const { data } = useData();
  const currUser = data?.allUsers.find((user) => user.login === username);

  var userProject: AllProject[] = [];
  data?.allProjects.map((project) => {
    if (currUser?.projects.includes(project.id)) {
      userProject.push(project);
    }
  });
  return (
    <div className="py-8">
      <div className="bg-white rounded-lg p-6 container mx-auto shadow-md">
        <div className="flex items-center">
          <img
            className="w-24 h-24 mr-6 rounded-full bg-indigo-800"
            src={currUser?.avatarUrl}
            alt=""
          />
          <div className="flex-1">
            <h3 className="text-xl">{currUser?.name || currUser?.login}</h3>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/${currUser?.login}`}
              className="text-indigo-800"
            >
              @{currUser?.login}
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="mt-10 text-lg text-gray-600 mb-2">Submissions</h2>
        <div className="card-grid">
          {userProject &&
            Object.values(userProject).map((project) => (
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
    </div>
  );
};

export default DevDetailsPage;
