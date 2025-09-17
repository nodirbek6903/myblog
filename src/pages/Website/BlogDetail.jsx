import { useParams, Link } from "react-router-dom"
import blogData from "../data/blogData.json"
import {motion} from "framer-motion"

const BlogDetail = () => {
  const {id} = useParams()
  const post = blogData.find((item) => item.id === parseInt(id))

  if(!post){
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Post topilmadi</h2>
        <Link to="/blog" className="mt-4 inline-block text-blue-600 hover:underline">Blog sahifasiga qaytish</Link>
      </div>
    )
  }



  return (
    <motion.div
    className="container mx-auto px-4 py-16 max-w-3xl"
    initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* back button */}
      <Link to="/blog" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← Orqaga
      </Link>

{/* image */}
    <div className="w-full h-64 overflow-hidden rounded-xl mb-6">
      <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
    </div>

    {/* title */}
    <h1 className="text-3xl font-bold text-gray-600 mb-4">{post.title}</h1>

    {/* date category */}
    <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
      <span>{post.date}</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">{post.category}</span>
    </div>

    {/* content */}
    <p className="text-gray-700 leading-relaxed mb-8">{post.content}</p>

    {/* tags */}
    <div className="flex flex-wrap gap-2">
      {
        post.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
            #{tag}
          </span>
        ))
      }
    </div>
    

    </motion.div>
  )
}

export default BlogDetail