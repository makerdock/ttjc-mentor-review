import React from "react";
import styled from "styled-components";

const DevListPageContainer = styled.div``;

interface DevListPageProps {}
const DevListPage: React.FC<DevListPageProps> = (props) => {
  return (
    <div className="container mx-auto mt-8 bg-white">
      <div className="rounded overflow-hidden shadow-lg px-4 py-8 ">
        <div className="flex">
          <div className="w-1/3 text-center">
            <span className="block text-3xl mb-2">32</span>
            <span className="text-gray-600 text-sm">Total Projects</span>
          </div>
          <div className="w-1/3 text-center">
            <span className="block text-3xl mb-2">32</span>
            <span className="text-gray-600 text-sm">Pending for Approval</span>
          </div>
          <div className="w-1/3 text-center">
            <span className="block text-3xl mb-2">32</span>
            <span className="text-gray-600 text-sm">Approved Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevListPage;
