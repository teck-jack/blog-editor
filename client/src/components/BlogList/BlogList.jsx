import { Link } from 'react-router-dom';

import {deleteBlog} from '../../services/api'

import { FiEdit, FiFileText, FiTrash2, FiClock, FiCalendar } from 'react-icons/fi';

const BlogList = ({ blogs }) => {
  const publishedBlogs = blogs.filter(blog => blog.status === 'published');
  const drafts = blogs.filter(blog => blog.status === 'draft');



  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Published Blogs</h2>
        {publishedBlogs.length === 0 ? (
          <p className="text-gray-500">No published blogs yet</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {publishedBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Drafts</h2>
        {drafts.length === 0 ? (
          <p className="text-gray-500">No drafts saved</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const BlogCard = ({ blog }) => {
  const createdDate = new Date(blog.created_at).toLocaleDateString();
  const createdTime = new Date(blog.created_at).toLocaleTimeString();

  const updatedDate = new Date(blog.updated_at).toLocaleDateString();
  const updatedTime = new Date(blog.updated_at).toLocaleTimeString();

  return (
    <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow bg-white flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>

        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {blog.content.substring(0, 120)}...
        </p>

        <div className="text-sm text-gray-500 space-y-1 mb-4">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400" />
            <span>Created: {createdDate}</span>
            <FiClock className="text-gray-400 ml-4" />
            <span>{createdTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400" />
            <span>Updated: {updatedDate}</span>
            <FiClock className="text-gray-400 ml-4" />
            <span>{updatedTime}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            blog.status === 'published'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {blog.status}
        </span>

        <div className="flex space-x-4">
          <Link
            to={`/edit/${blog._id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            {blog.status === 'published' ? (
              <FiFileText className="mr-1" />
            ) : (
              <FiEdit className="mr-1" />
            )}
            {blog.status === 'published' ? 'View' : 'Edit'}
          </Link>

          <button
            onClick={async (e) => {
              e.preventDefault();
              if (window.confirm('Are you sure you want to delete this blog?')) {
                await deleteBlog(blog._id);
                window.location.reload();
              }
            }}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};


export default BlogList;