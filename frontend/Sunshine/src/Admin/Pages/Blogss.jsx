import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faCalendarAlt,
  faFolder,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faEye,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../../CustomAlert/CustomAlert";
import BlogForm from "../Forms/BlogForm";

const Blogss = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Understanding Mental Health",
      description: "A comprehensive guide to understanding mental health and its importance in our daily lives. Learn about common mental health conditions and how to seek help.",
      category: "Mental Health",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      status: "published",
      readTime: "5 min read",
      author: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Stress Management Techniques",
      description: "Effective stress management techniques that can help you maintain mental wellness in today's fast-paced world. Practical tips and exercises.",
      category: "Wellness",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      status: "published",
      readTime: "4 min read",
      author: "Dr. Michael Chen"
    },
    {
      id: 3,
      title: "Mindfulness Meditation Guide",
      description: "Step-by-step guide to mindfulness meditation for beginners. Learn how to practice mindfulness and incorporate it into your daily routine.",
      category: "Meditation",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      status: "draft",
      readTime: "6 min read",
      author: "Dr. Priya Sharma"
    },
    {
      id: 4,
      title: "Breaking Mental Health Stigma",
      description: "How we can work together to break the stigma surrounding mental health issues and create a more supportive community.",
      category: "Awareness",
      date: "2024-01-08",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      status: "published",
      readTime: "3 min read",
      author: "Dr. Robert Davis"
    },
    {
      id: 5,
      title: "Nutrition and Mental Health",
      description: "Exploring the connection between nutrition and mental wellbeing. Learn which foods can support your mental health journey.",
      category: "Nutrition",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      status: "published",
      readTime: "7 min read",
      author: "Dr. Lisa Wang"
    },
    {
      id: 6,
      title: "Sleep and Mental Wellness",
      description: "The crucial relationship between quality sleep and mental health. Tips for improving your sleep patterns for better mental wellbeing.",
      category: "Wellness",
      date: "2024-01-03",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop",
      status: "published",
      readTime: "5 min read",
      author: "Dr. James Wilson"
    }
  ]);

  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageModal, setImageModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const blogsPerPage = 6;

  // Get unique categories
  const categories = ["all", ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs based on search, category, and status
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || blog.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    setAlert({
      type: "success",
      message: "Blog deleted successfully!",
    });
    setDeleteConfirm(null);

    // Adjust current page if needed after deletion
    if (currentBlogs.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingBlog) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id ? { ...blog, ...formData } : blog
        )
      );
      setAlert({
        type: "success",
        message: "Blog updated successfully!",
      });
    } else {
      const newBlog = {
        id: blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) + 1 : 1,
        ...formData,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.max(3, Math.floor(formData.description.length / 200))} min read`,
        author: "Admin"
      };
      setBlogs([...blogs, newBlog]);
      setAlert({
        type: "success",
        message: "Blog created successfully!",
      });
    }
    setShowForm(false);
    setEditingBlog(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border border-green-300";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "archived":
        return "bg-gray-100 text-gray-800 border border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Mental Health": "bg-blue-100 text-blue-800",
      "Wellness": "bg-green-100 text-green-800",
      "Meditation": "bg-purple-100 text-purple-800",
      "Awareness": "bg-orange-100 text-orange-800",
      "Nutrition": "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Dynamic pagination generation
  const getPaginationNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push("...");
      if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }

    return [...new Set(pages)].sort((a, b) => a - b);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-[#2d365b] mb-3">
              Blog Management
            </h1>
            <p className="text-gray-600 text-lg">
              Create and manage blog posts for mental health awareness
            </p>
          </div>

          {/* Add Blog Button */}
          <button
            onClick={() => setShowForm(true)}
            className="group relative bg-[#2d365b] text-white px-8 py-4 rounded-xl font-semibold shadow-md border border-[#2d365b] hover:bg-white hover:text-[#2d365b] transition-all duration-300 ease-in-out overflow-hidden"
          >
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faPlus}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              <span className="text-lg">Add New Blog</span>
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Blogs Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {blogs.length}
                </div>
                <div className="text-gray-600 font-medium">Total Blogs</div>
              </div>
              <div className="w-16 h-16 bg-[#2d365b] rounded-xl flex items-center justify-center group-hover:rotate-360 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Published Blogs Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {blogs.filter((b) => b.status === "published").length}
                </div>
                <div className="text-gray-600 font-medium">Published</div>
              </div>
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center group-hover:rotate-360 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Draft Blogs Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {blogs.filter((b) => b.status === "draft").length}
                </div>
                <div className="text-gray-600 font-medium">Drafts</div>
              </div>
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center group-hover:rotate-360 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-gray-600 font-medium">Categories</div>
              </div>
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center group-hover:rotate-360 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Search Blogs
              </label>
              <div className="relative">
              
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or description..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                />
                
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            {/* <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div> */}
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </div>
            <button
              onClick={handleResetFilters}
              className="text-sm text-[#2d365b] font-semibold hover:text-[#1e2a4a] transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden group hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 ease-in-out"
            >
              {/* Blog Image */}
              <div 
                className="h-48 overflow-hidden relative cursor-pointer"
                onClick={() => setImageModal(blog)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      blog.status
                    )}`}
                  >
                    {blog.status}
                  </span>
                </div> */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      blog.category
                    )}`}
                  >
                    {blog.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Blog Content */}
              <div className="p-5">
                {/* Blog Title */}
                <h3 className="text-lg font-bold text-[#2d365b] mb-3 line-clamp-2 group-hover:text-[#3a4a7a] transition-colors duration-300">
                  {blog.title}
                </h3>

                {/* Blog Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* Blog Meta */}
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="mr-2 w-3"
                      />
                      <span>
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {/* <span>{blog.readTime}</span> */}
                  </div>
                  {/* <div className="text-xs">
                    By {blog.author}
                  </div> */}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 bg-[#2d365b] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2d365b]"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(blog.id)}
                    className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-300">
            <div className="text-6xl mb-6 text-[#2d365b]">📝</div>
            <h3 className="text-2xl font-bold text-[#2d365b] mb-4">
              No Blogs Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all" 
                ? "Try adjusting your search filters to find more blogs."
                : "Get started by creating your first blog post to share mental health insights."
              }
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#2d365b] text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-white hover:text-[#2d365b] border border-[#2d365b] transition-all duration-300"
            >
              Create Your First Blog
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2d365b] transition-all duration-300"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-[#2d365b]"
              />
            </button>

            {/* Page Numbers */}
            {getPaginationNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof pageNum === "number" && setCurrentPage(pageNum)
                }
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                  pageNum === currentPage
                    ? "bg-[#2d365b] text-white shadow-md border border-[#2d365b]"
                    : "bg-white text-gray-700 shadow-md border border-gray-300 hover:border-[#2d365b] hover:bg-gray-50"
                } ${
                  pageNum === "..."
                    ? "cursor-default hover:bg-white hover:border-gray-300"
                    : ""
                }`}
                disabled={pageNum === "..."}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2d365b] transition-all duration-300"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#2d365b]"
              />
            </button>
          </div>
        )}
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-auto transform animate-scale-in">
            <h3 className="text-xl font-bold text-[#2d365b] mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 border border-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setImageModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setImageModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#2d365b] rounded-full flex items-center justify-center hover:bg-[#1e2a4a] transition-all duration-300 shadow-lg border border-[#2d365b]"
            >
              <FontAwesomeIcon icon={faXmark} className="text-white text-lg" />
            </button>

            <div className="w-full h-[70vh] overflow-hidden">
              <img
                src={imageModal.image}
                alt={imageModal.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-white border-t border-gray-200">
              <h3 className="text-2xl font-bold text-[#2d365b] mb-3">
                {imageModal.title}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{imageModal.description}</p>
                
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="mr-3 w-4 text-[#2d365b]"
                  />
                  <span className="font-medium">
                    {new Date(imageModal.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="mr-3 w-4 text-[#2d365b]"
                  />
                  <span>{imageModal.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogss;