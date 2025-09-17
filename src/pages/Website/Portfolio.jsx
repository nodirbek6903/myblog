import { useState } from "react";
import { LinkIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import portfolioData from "../data/portfolioData.json";

// Texnologiya uchun iconlar
const techIcons = {
  React: "⚛️",
  Node: "🟢",
  MongoDB: "🍃",
  Tailwind: "💨",
  Express: "🚀",
  JavaScript: "📜",
  Redux: "🌀",
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("Barchasi");

  const categories = ["Barchasi", "Frontend", "Fullstack"];

  // Filterlangan loyihalar
  const filteredProjects =
    filter === "Barchasi"
      ? portfolioData
      : portfolioData.filter((project) => project.category === filter);

  return (
    <section className="container mx-auto px-4 py-16 relative">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Mening Loyihalarim
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Project Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Project Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {project.description}
              </p>

              {/* Technologies with icons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    <span>{techIcons[tech] || "💻"}</span>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex justify-between items-center mt-4">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-700 gap-2 transition"
                  onClick={(e) => e.stopPropagation()} // modal ochilmasligi uchun
                >
                  <LinkIcon className="w-5 h-5" />
                  Demo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-gray-900 gap-2 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CodeBracketIcon className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md transition-opacity duration-300"
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }} // Hiralashgan fon
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative transform transition-all duration-300 scale-100 hover:scale-105">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-2xl transition"
            >
              &times;
            </button>

            {/* Modal Content */}
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-2xl font-bold mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>

            {/* Technologies in Modal */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                >
                  <span>{techIcons[tech] || "💻"}</span>
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex justify-between items-center mt-4">
              <a
                href={selectedProject.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:text-blue-700 gap-2 transition"
              >
                <LinkIcon className="w-5 h-5" />
                Demo
              </a>
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-gray-900 gap-2 transition"
              >
                <CodeBracketIcon className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
