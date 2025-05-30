import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '../../components/Editor/Editor';
import { getBlogById } from '../../services/api';

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await getBlogById(id);
          setBlog(response.data);
        } catch (error) {
          console.error('Failed to fetch blog:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSave = (savedBlog) => {
    setBlog(savedBlog);
    if (!id) {
      navigate(`/edit/${savedBlog._id}`);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Blog' : 'Create New Blog'}
      </h1>
      <Editor blog={blog} onSave={handleSave} />
    </div>
  );
};

export default EditorPage;