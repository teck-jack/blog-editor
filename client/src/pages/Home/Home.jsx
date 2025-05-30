import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogList from '../../components/BlogList/BlogList';
import { getAllBlogs } from '../../services/api';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // for redirecting after logout

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear auth token
    navigate('/login'); // Redirect to login or any other page
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Blog Dashboard</h1>
        <div className="flex gap-4">
          <Link
            to="/edit/new"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            + Create New Post
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your blogs...</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <BlogList blogs={blogs} />
        </div>
      )}

      <div className="mt-8 text-center text-gray-500 text-sm">
        {blogs.length > 0 ? (
          <p>Showing {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}</p>
        ) : (
          <p>No posts yet. Create your first blog!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
