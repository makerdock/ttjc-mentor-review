import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// const ReactMarkdown = require("react-markdown");

interface ProjectDetailPageProps {}
const ProjectDetailPage: React.FC<ProjectDetailPageProps> = (props) => {
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <div className="mt-8 bg-white rounded-lg p-6 container">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <img
              className="h-16 w-16 md:h-16 md:w-16 rounded-full mx-auto md:mx-0 md:mr-6"
              src="https://avatars0.githubusercontent.com/u/36530381?s=460&u=f5c86dce9b82630cd575e51bf8e201bc1692a75a&v=4"
              alt=""
            />
            <div>
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
            </div>
          </div>
          <div>
            <Link
              to="/review"
              className="inline-block text-sm px-4 py-2 border rounded text-indigo-800 border-indigo-800 hover:border-transparent hover:text-white hover:bg-indigo-800  mt-4 lg:mt-0"
            >
              Next Project
            </Link>
          </div>
        </div>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className="border rounded mt-4 pt-8 pb-10 px-4">
            <div className="text-xl text-center font-bold">
              Personal Blog: 🚀⚡️ Blazing fast blog built with GatsbyJS
            </div>
            <div className="text-xl text-right">5 days ago</div>
            <ReactMarkdown
              source={`Hello Mentors,

I have designed and developed a web application using:
- [GatsbyJS](https://www.gatsbyjs.org/)
- HTML5/CSS3
- Hosted on serverless AWS S3/AWS CloudFront (CDN) and used AWS Lambda Functions.

The blog is responsive with Like function similar to [Medium.com](https://medium.com/) and subscribes option created using AWS Lambda function. 

The project is live @ [https://blog.viralsangani.me/](https://blog.viralsangani.me/)
The [Github Link](https://github.com/viral-sangani/gatsby-blog)

### Demo

![Demo](https://raw.githubusercontent.com/viral-sangani/gatsby-blog/master/static/gatsby-blog-gif.gif)
`}
            />
            <div className="text-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
