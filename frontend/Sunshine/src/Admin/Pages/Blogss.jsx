import React, { useState, useEffect } from "react";
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
import axios from "../../utils/Admin/axiosinstance";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Blogss = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageModal, setImageModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogsPerPage = 6;
  const token = sessionStorage.getItem("admin_token");

  /* ================= FETCH BLOGS ================= */
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/blog/list`);

      if (response.data.status) {
        const apiBlogs = response.data.error.map((blog) => ({
          id: Number(blog.id), // ✅ IMPORTANT FIX
          title: blog.heading,
          description: blog.description,
          category: blog.category,
          date:
            blog.date !== "0000-00-00"
              ? blog.date
              : blog.created_at.split(" ")[0],
          image: blog.image
            ? `${API_BASE_URL}/${blog.image}`
            : "https://via.placeholder.com/400x300?text=No+Image",
          status: blog.status === "1" ? "published" : "draft",
        }));
        setBlogs(apiBlogs);
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Failed to load blogs." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ================= FILTER & PAGINATION ================= */
  const categories = ["all", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

  /* ================= DELETE BLOG ================= */
  const handleDelete = async (id) => {
    try {
      const formData = new FormData();
      formData.append("id", id);

      await axios.post(`${API_BASE_URL}/blog/delete`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ REMOVE FROM UI
      setBlogs((prev) => prev.filter((b) => b.id !== Number(id)));

      // ✅ KEEP BACKEND & UI SYNC
      await fetchBlogs();

      setAlert({ type: "success", message: "Blog deleted successfully!" });
      setDeleteConfirm(null);

      if (currentBlogs.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Failed to delete blog." });
    }
  };

  /* ================= ADD / EDIT BLOG ================= */
  const handleFormSubmit = async (formData) => {
    try {
      if (editingBlog) {
        await axios.put(
          `${API_BASE_URL}/blogs/${editingBlog.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAlert({ type: "success", message: "Blog updated successfully!" });
      } else {
        await axios.post(`${API_BASE_URL}/blog/add`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlert({ type: "success", message: "Blog created successfully!" });
      }

      await fetchBlogs();
      setShowForm(false);
      setEditingBlog(null);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Failed to save blog." });
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Mental Health": "bg-blue-100 text-blue-800",
      therapy: "bg-purple-100 text-purple-800",
      Wellness: "bg-green-100 text-green-800",
      Meditation: "bg-indigo-100 text-indigo-800",
      Awareness: "bg-orange-100 text-orange-800",
      Nutrition: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-[#2a5298]">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* ADD BLOG BUTTON */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2a5298]">Blog Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#2a5298] text-white px-6 py-3 rounded-lg font-semibold"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Blog
        </button>
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow border overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover cursor-pointer"
              onClick={() => setImageModal(blog)}
            />

            <div className="p-4">
              <span
                className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(
                  blog.category
                )}`}
              >
                {blog.category}
              </span>

              <h3 className="font-bold text-lg text-[#2a5298] mt-2">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.description}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex-1 bg-[#2a5298] text-white py-2 rounded"
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(blog.id)}
                  className="flex-1 bg-red-100 text-red-600 py-2 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingBlog(null);
          }}
        />
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogss;
