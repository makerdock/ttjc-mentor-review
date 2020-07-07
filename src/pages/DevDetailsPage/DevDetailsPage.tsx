import React from "react";
import { useData } from "../../contexts/DataContext";
import { useParams } from "react-router";

interface DevDetailsPageProps {}
const DevDetailsPage: React.FC<DevDetailsPageProps> = (props) => {
  let { username } = useParams();

  const { data } = useData();
  const currUser = data?.allUsers.find((user) => user.login == username);
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
              href={`https://github.com/${currUser?.login}`}
              className="text-indigo-800"
            >
              @{currUser?.login}
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="mt-10 text-lg text-gray-600 mb-2">Projects</h2>
        <div className="card-grid">
          <div className="bg-white rounded-lg p-6 shadow-md"></div>
        </div>
        <h2 className="mt-10 text-lg text-gray-600 mb-2">Blogs</h2>
        <div className="card-grid">
          <div className="bg-white rounded-lg p-6 shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default DevDetailsPage;
