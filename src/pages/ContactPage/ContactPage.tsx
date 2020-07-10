import React from "react";

interface ContactPageProps {}
const ContactPage: React.FC<ContactPageProps> = (props) => {
  return (
    <div className="flex flex-wrap justify-center items-center w-full h-full">
      <div className="w-60 bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden my-4 mx-10">
        <img
          className="w-full h-56 object-cover object-center"
          src="https://avatars3.githubusercontent.com/u/13379773?s=400&u=372bd79e2ec0b4256f689f05055a929cd095edd1&v=4"
          alt="avatar"
        />
        <div className="py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            Utkarsh Bhimte
          </h1>

          <div className="flex justify-center items-center mt-4 text-gray-700">
            <a
              href="https://twitter.com/bhimtebhaisaab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 text-sm"
            >
              <img
                className="w-6"
                src="https://image.flaticon.com/icons/svg/733/733579.svg"
                alt="URL icon"
              />
            </a>
            <a
              href="https://workofutkarsh.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 text-sm"
            >
              <img
                className="w-6"
                src="https://image.flaticon.com/icons/svg/2235/2235588.svg"
                alt="URL icon"
              />
            </a>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="w-60 bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden my-4 mx-10">
        <img
          className="w-full h-56 object-cover object-center"
          src="https://avatars0.githubusercontent.com/u/36530381?s=460&u=f5c86dce9b82630cd575e51bf8e201bc1692a75a&v=4"
          alt="avatar"
        />

        <div className="py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            &nbsp;&nbsp;Viral Sangani&nbsp; &nbsp;
          </h1>

          <div className="flex justify-center items-center mt-4 text-gray-700">
            <a
              href="https://twitter.com/viral_sangani_"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 text-sm"
            >
              <img
                className="w-6"
                src="https://image.flaticon.com/icons/svg/733/733579.svg"
                alt="URL icon"
              />
            </a>
            <a
              href="https://viralsangani.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 text-sm"
            >
              <img
                className="w-6"
                src="https://image.flaticon.com/icons/svg/2235/2235588.svg"
                alt="URL icon"
              />
            </a>
            <a
              href="https://github.com/viral-sangani"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 text-sm"
            >
              <img
                className="w-6"
                src="https://image.flaticon.com/icons/svg/2111/2111425.svg"
                alt="URL icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
