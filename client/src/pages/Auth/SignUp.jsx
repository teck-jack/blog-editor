import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import Notification from '../../../src/components/Notification/Notification';


const SignUp = () => {
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      setError('');
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
     setNotification({ message: 'Sucessfully Register', type: 'success' });
        setTimeout(()=>{

          navigate('/login');
        },1000)
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
     setNotification({ message: 'Registration failed', type: 'error' });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
              minLength={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
              minLength={6}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Already have an account? Login
            </Link>
          </div>
        </form>
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

export default SignUp;