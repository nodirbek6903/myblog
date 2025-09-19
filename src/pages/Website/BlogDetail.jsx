import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdBlog } from "../../redux/postSlice";
import { useEffect } from "react";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const { selectedBlog, loading } = useSelector((state) => state.blogs);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchByIdBlog(id));
  }, [dispatch, id]);

  // Loading holati
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Blog topilmagan holat
  if (!selectedBlog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Blog topilmadi</h2>
        <Link
          to="/blog"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Blog sahifasiga qaytish
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-16 max-w-3xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Orqaga tugmasi */}
      <Link
        to="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Orqaga
      </Link>

      {/* Blog rasmi */}
      <div className="w-full h-64 overflow-hidden rounded-xl mb-6 shadow-md">
        <img
          src={selectedBlog?.image}
          alt={selectedBlog?.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sarlavha */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {selectedBlog?.title}
      </h1>

      {/* Sana va kategoriya */}
      <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
        <span>{selectedBlog?.date}</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
          {selectedBlog?.category}
        </span>
      </div>

      {/* Description qismini ajratilgan joyda ko‘rsatamiz */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Qisqacha tavsif</h2>
        <p className="text-gray-600 leading-relaxed">
          {selectedBlog?.description}
        </p>
      </div>

      {/* Content to‘liq ma'lumot */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">To‘liq ma'lumot</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {selectedBlog?.content}
        </p>
      </div>

      {/* Teglar */}
      {selectedBlog?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedBlog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BlogDetail;
