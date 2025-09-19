import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// website pages
import Home from "../pages/Website/Home";
import About from "../pages/Website/About";
import Blog from "../pages/Website/Blog";
import BlogDetail from "../pages/Website/BlogDetail";
import Portfolio from "../pages/Website/Portfolio";
import PortfolioDetail from "../pages/Website/PortfolioDetail";
import Contact from "../pages/Website/Contact";
import NotFound from "../pages/Website/NotFound";

// admin pages
import Dashboard from "../pages/Admin/Dashboard";
import Blogs from "../pages/Admin/Blogs";
import BlogDetails from "../pages/Admin/BlogDetails";
import AdminPortfolio from "../pages/Admin/Portfolio";
import AdminAbout from "../pages/Admin/About";
import Messages from "../pages/Admin/Messages";
import Login from "../pages/Admin/Login";
import SecretAccess from "../pages/SecretAccess/SecretAccess";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      localStorage.removeItem("token");
      localStorage.removeItem("secretPassed");
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Website routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:id" element={<PortfolioDetail />} />
      <Route path="/contact" element={<Contact />} />

      {/* Secret access sahifasi */}
      <Route path="/secret-access" element={<SecretAccess />} />

      {/* Admin login sahifasi */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Route>

      {/* Not found sahifasi */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
