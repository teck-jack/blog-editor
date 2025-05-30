import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import EditorPage from './pages/EditorPage/EditorPage';
import Login from '../src/pages/Auth/Login';
import SignUp from '../src/pages/Auth/SignUp'; // Ensure this import path is correct

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> {/* Add this new route for registration */}

          {/* Private Routes (require authentication) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/new"
            element={
              <PrivateRoute>
                <EditorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditorPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;