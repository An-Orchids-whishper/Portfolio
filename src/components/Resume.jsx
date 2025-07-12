import React from "react";
import { FaDownload } from "react-icons/fa";

const Resume = () => {
  return (
    <section
      id="resume"
      className="min-h-screen flex items-center justify-center px-4 py-20 
      bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white"
    >
      <div className="relative z-10 text-center space-y-6 p-10 bg-white/5 dark:bg-white/5 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold">My Resume</h2>
        <p className="text-gray-800 dark:text-gray-300 text-lg max-w-xl mx-auto">
          Dive into my experience, skills, and accomplishments. Download it below!
        </p>

        <a
          href="/kartik_resume.pdf"
          download
          className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 text-lg font-medium"
        >
          <FaDownload className="animate-bounce" />
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Resume;
