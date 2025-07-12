import React from "react";
import Tilt from "react-parallax-tilt";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiOpenai,
  SiJavascript,
} from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "React.js", icon: <FaReact className="text-blue-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-500" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Python", icon: <FaPython className="text-yellow-500" /> },
  { name: "OpenAI APIs", icon: <SiOpenai className="text-purple-500" /> },
  { name: "Git & GitHub", icon: <FaGitAlt className="text-red-600" /> },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white"
    >
      <div className="p-10 max-w-5xl w-full z-10 text-center">
        <h2 className="text-3xl font-bold mb-10">Skills & Tools</h2>
        <div className="grid grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.05}
              transitionSpeed={400}
              className="rounded-lg"
            >
              <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-transform">
                <div className="text-6xl mb-3">{skill.icon}</div>
                <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                  {skill.name}
                </p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
