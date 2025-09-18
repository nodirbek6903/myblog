import { useEffect, useState } from "react";
import { LinkIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { fetchPortfolios } from "../../redux/portfolioSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Portfolio = () => {
  const [filter, setFilter] = useState("Barchasi");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolios: portfolioData,loading } = useSelector((state) => state.portfolio);

  const categories = ["Barchasi", "Frontend", "Fullstack"];

  useEffect(() => {
    dispatch(fetchPortfolios());
  }, [dispatch]);

  const filteredProjects =
    filter === "Barchasi"
      ? portfolioData
      : portfolioData.filter((project) => project.category === filter);

    
      if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16 relative">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Mening Loyihalarim
      </h2>

      {/* Filter tugmalari */}
      <div className="flex justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/portfolio/${project._id}`)}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Rasm */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Kontent */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
