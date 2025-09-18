import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { fetchPortfolioById } from "../../redux/portfolioSlice";
import { LinkIcon, CodeBracketIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const PortfolioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { selectedPortfolio, loading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchPortfolioById(id));
  }, [dispatch, id]);

   if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!selectedPortfolio) {
    return (
      <p className="text-center mt-10 text-red-500">Portfolio topilmadi</p>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">

{/* Orqaga tugmasi */}
        <button
          onClick={() => navigate("/portfolio")}
          className="flex items-center cursor-pointer gap-2 mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Orqaga
        </button>

        {/* Asosiy rasm */}
        <div className="mb-10">
          <img
            src={selectedPortfolio.image}
            alt={selectedPortfolio.title}
            className="w-full h-80 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Asosiy ma'lumotlar */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {selectedPortfolio.title}
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            {selectedPortfolio.description}
          </p>

          {/* Tafsilotlar */}
          {selectedPortfolio.details && (
            <div className="bg-gray-50 p-5 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Tafsilotlar
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {selectedPortfolio.details}
              </p>
            </div>
          )}

          {/* Linklar */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href={selectedPortfolio.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
            >
              <LinkIcon className="w-5 h-5" />
              Demo
            </a>
            <a
              href={selectedPortfolio.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition shadow"
            >
              <CodeBracketIcon className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioDetails;
