Blog Editor Application
This is a full-stack blog editor application with auto-save draft functionality, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It offers user authentication, rich text editing, blog publishing, and efficient draft management.

Features
User registration and login
Create, edit, and delete blog posts
Auto-save draft functionality
Publish/unpublish posts
Tag system for blog posts
Responsive design with Tailwind CSS
Secure authentication with JWT


Prerequisites
Make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm (v6 or higher)


1. Clone the Repository:- https://github.com/teck-jack/blog-editor.git
2. Then go on :- cd blog-editor
3. Backend Setup
cd server
npm install

4. Create a .env file in the server directory with the following content:
MONGO_URI=mongodb://localhost:27017/blog-editor
PORT=5000
JWT_SECRET=your_strong_jwt_secret_here

5. Start the backend server: npm start

6. Frontend Setup
cd ../client
npm install

Start the frontend development server: npm start



Project Structure

blog-editor/
├── client/                 # Frontend (React)
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.js          # Main application component
│   └── package.json        # Frontend dependencies
├── server/                 # Backend (Node.js/Express)
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── .env                # Environment variables
│   └── server.js           # Main server file
└── README.md               # This file


API Endpoints
Authentication

POST /api/auth/register - Register a new user
POST /api/auth/login - Login an existing user
Blogs
GET /api/blogs - Get all blogs for the current user
GET /api/blogs/:id - Get a specific blog
POST /api/blogs/save-draft - Save or update a draft
POST /api/blogs/publish - Publish a blog
DELETE /api/blogs/:id - Delete a blog


Environment Variables

Backend (server/.env)
MONGO_URI - MongoDB connection string
PORT - Server port (default: 5000)
JWT_SECRET - Secret key for JWT tokens

