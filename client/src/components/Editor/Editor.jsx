/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { FiSave, FiUpload } from 'react-icons/fi';
import { saveDraft, publishBlog,  } from '../../services/api';
import Notification from '../Notification/Notification';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Editor = ({ blog, onSave }) => {
   const navigate = useNavigate();
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [tags, setTags] = useState(blog?.tags?.join(', ') || '');
  const [notification, setNotification] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save after 5 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        handleAutoSave();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [title, content, tags]);

  const handleAutoSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const response = await saveDraft({
        id: blog?._id,
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      setNotification({ message: 'Draft auto-saved!', type: 'success' });
      onSave(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to auto-save', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      const response = await publishBlog({
        id: blog?._id,
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      setNotification({ message: 'Blog published!', type: 'success' });
      onSave(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to publish', type: 'error' });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <FiArrowLeft className="mr-1" /> Back
      </button>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter blog title"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your blog content here..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="tech, programming, web"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleAutoSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          <FiSave className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>

        <button
          onClick={handlePublish}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <FiUpload className="mr-2" />
          Publish
        </button>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Editor;