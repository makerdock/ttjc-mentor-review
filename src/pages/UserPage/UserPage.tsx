import React from "react";
import styled from "styled-components";

const UserPageContainer = styled.div`
  width: 90%;
  display: flex;
  margin: auto;
  margin-top: 50px;
`;

interface UserPageProps {}
const UserPage: React.FC<UserPageProps> = (props) => {
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        <div className="px-1 w-full md:w-1/2 my-10 lg:px-4 lg:w-1/3">
          <div className="relative h-16 bg-white">
            <img
              style={{
                position: "absolute",
                top: "-2.5rem",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
              className="w-20 h-20 rounded-full"
              src="https://avatars0.githubusercontent.com/u/36530381?s=460&u=f5c86dce9b82630cd575e51bf8e201bc1692a75a&v=4"
              alt="Avatar of Jonathan Reinink"
            />
          </div>
          <article className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="px-6 pb-4 bg-white">
              <div className="text-xl text-center">Viral Sangani</div>
              <div className="text-xs text-indigo-800 text-gray-700 text-center ">
                <a
                  className="no-underline hover:underline focus:text-gray-900 hover:text-gray-900"
                  href="https://github.com/viral-sangani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @viral-sangani
                </a>
              </div>
              <div className="text-orange-400 text-xs text-center">
                3 reviews pending
              </div>
            </div>
          </article>
        </div>

        {/*  */}

        <div className="px-1 w-full md:w-1/2 my-10 lg:px-4 lg:w-1/3">
          <div className="relative h-16 bg-white">
            <img
              style={{
                position: "absolute",
                top: "-2.5rem",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
              className="w-20 h-20 rounded-full"
              src="https://avatars0.githubusercontent.com/u/36530381?s=460&u=f5c86dce9b82630cd575e51bf8e201bc1692a75a&v=4"
              alt="Avatar of Jonathan Reinink"
            />
          </div>
          <article className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="px-6 pb-4 bg-white">
              <div className="text-xl text-center">Viral Sangani</div>
              <div className="text-xs text-indigo-800 text-gray-700 text-center ">
                <a
                  className="no-underline hover:underline focus:text-gray-900 hover:text-gray-900"
                  href="https://github.com/viral-sangani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @viral-sangani
                </a>
              </div>
              <div className="text-orange-400 text-xs text-center">
                3 reviews pending
              </div>
            </div>
          </article>
        </div>

        <div className="px-1 w-full md:w-1/2 my-10 lg:px-4 lg:w-1/3">
          <div className="relative h-16 bg-white">
            <img
              style={{
                position: "absolute",
                top: "-2.5rem",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
              className="w-20 h-20 rounded-full"
              src="https://avatars0.githubusercontent.com/u/36530381?s=460&u=f5c86dce9b82630cd575e51bf8e201bc1692a75a&v=4"
              alt="Avatar of Jonathan Reinink"
            />
          </div>
          <article className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="px-6 pb-4 bg-white">
              <div className="text-xl text-center">Viral Sangani</div>
              <div className="text-xs text-indigo-800 text-gray-700 text-center ">
                <a
                  className="no-underline hover:underline focus:text-gray-900 hover:text-gray-900"
                  href="https://github.com/viral-sangani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @viral-sangani
                </a>
              </div>
              <div className="text-orange-400 text-xs text-center">
                3 reviews pending
              </div>
            </div>
          </article>
        </div>

        <div className="px-1 w-full md:w-1/2 my-10 lg:px-4 lg:w-1/3">
          <div className="relative h-16 bg-white">
            <img
              style={{
                position: "absolute",
                top: "-2.5rem",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
              className="w-20 h-20 rounded-full"
              src="https://avatars0.githubusercontent.com/u/36530381?s=460&u=f5c86dce9b82630cd575e51bf8e201bc1692a75a&v=4"
              alt="Avatar of Jonathan Reinink"
            />
          </div>
          <article className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="px-6 pb-4 bg-white">
              <div className="text-xl text-center">Viral Sangani</div>
              <div className="text-xs text-indigo-800 text-gray-700 text-center ">
                <a
                  className="no-underline hover:underline focus:text-gray-900 hover:text-gray-900"
                  href="https://github.com/viral-sangani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @viral-sangani
                </a>
              </div>
              <div className="text-orange-400 text-xs text-center">
                3 reviews pending
              </div>
            </div>
          </article>
        </div>

        <div className="px-1 w-full md:w-1/2 my-10 lg:px-4 lg:w-1/3">
          <div className="relative h-16 bg-white">
            <img
              style={{
                position: "absolute",
                top: "-2.5rem",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
              className="w-20 h-20 rounded-full"
              src="https://avatars0.githubusercontent.com/u/36530381?s=460&u=f5c86dce9b82630cd575e51bf8e201bc1692a75a&v=4"
              alt="Avatar of Jonathan Reinink"
            />
          </div>
          <article className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="px-6 pb-4 bg-white">
              <div className="text-xl text-center">Viral Sangani</div>
              <div className="text-xs text-indigo-800 text-gray-700 text-center ">
                <a
                  className="no-underline hover:underline focus:text-gray-900 hover:text-gray-900"
                  href="https://github.com/viral-sangani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @viral-sangani
                </a>
              </div>
              <div className="text-orange-400 text-xs text-center">
                3 reviews pending
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
