import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import blogData from "../data/blogData.json"
import { motion } from 'framer-motion';
import {useDispatch,useSelector} from "react-redux"
import {fetchBlogs} from "../../redux/postSlice"


const Blog = () => {
  const dispatch = useDispatch()
  const {blogs,loading} = useSelector(state => state.blogs)
  const [selectedCategory, setSelectedCategory] = useState("Barchasi")
  
  useEffect(() => {
    dispatch(fetchBlogs())
  },[dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  
  const category = ["Barchasi", ...new Set(blogs.map((item) => item.category))];
  const filteredPosts = selectedCategory === "Barchasi" ? blogs : blogs.filter((post) => post.category === selectedCategory)


  return (
    <section className="container mx-auto px-4 py-16">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Mening Blogim</h2>

      {/* Category Filter */}
      <div className="flex justify-center mb-10 gap-3 flex-wrap">
        {category.map((cat) => (
          <button key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === cat ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          filteredPosts.map((post) => (
            <motion.div
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration: 0.4}}
            >
              <div className="h-48 w-full overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

            {/* blog content */}
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index}
                  className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/*  read more link */}

                <Link to={`/blog/${post._id}`}
                className="inline-block text-blue-600 font-medium hover:underline"
                >
                  Batafsil o'qish →
                </Link>

            </div>

            </motion.div>
          ))
        }
      </div>

    </section>
  )
}

export default Blog