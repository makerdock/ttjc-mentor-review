import React from "react";

interface DevDetailsPageProps {}
const DevDetailsPage: React.FC<DevDetailsPageProps> = (props) => {
  return (
    <div className="py-8">
      <div className="bg-white rounded-lg p-6 container mx-auto shadow-md">
        <div className="flex">
          <img
            className="w-24 h-24 mr-6 rounded-full bg-indigo-800"
            src=""
            alt=""
          />
          <div className="flex-1">
            <h3 className="text-xl">Utkarsh Bhimte</h3>
            <a
              target="_blank"
              href="https://github.com/utkarshbhimte"
              className="text-indigo-800"
            >
              @utkarshbhimte
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
