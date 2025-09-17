import {Routes, Route} from "react-router-dom"

import Home from "../pages/Website/Home"
import About from "../pages/Website/About"
import Blog from "../pages/Website/Blog"
import BlogDetail from "../pages/Website/BlogDetail"
import Portfolio from "../pages/Website/Portfolio"
import PortfolioDetail from "../pages/Website/PortfolioDetail"
import Contact from "../pages/Website/Contact"

// admin pages
import Dashboard from "../pages/Admin/Dashboard"
import Posts from "../pages/Admin/Posts"
import AdminPortfolio from "../pages/Admin/Portfolio"
import AdminAbout from "../pages/Admin/About"
import Messages from "../pages/Admin/Messages"
import Login from "../pages/Admin/Login"

export default function AppRoutes() {
    return (
        <Routes>
            {/* website routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/contact" element={<Contact />} />

            {/* admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/portfolio" element={<AdminPortfolio />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/messages" element={<Messages />} />
        </Routes>
    )
}