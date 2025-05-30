import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
            BlogApp
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            {currentUser && (
              <Link 
                to="/edit/new" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Create Post
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="hidden sm:inline text-gray-600">
                Welcome, {currentUser.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;