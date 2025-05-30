Overview
A full-stack blog editor application with auto-save draft functionality, built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features include user authentication, rich text editing, blog publishing, and draft management.
----------------------------------------------------------------------------------------------------------------

Features
User registration and login

Create, edit, and delete blog posts

Auto-save draft functionality

Publish/unpublish posts

Tag system for blog posts

Responsive design with Tailwind CSS

Secure authentication with JWT

----------------------------------------------------------------------------------------------------------------
Prerequisites
Node.js (v14 or higher)

MongoDB (v4.4 or higher)

npm (v6 or higher)

----------------------------------------------------------------------------------------------------------------
Setup Instructions

1. Clone the Repository
bash
git clone :-https://github.com/teck-jack/blog-editor
cd blog-editor


2. Backend Setup
bash
cd server
npm install
Create a .env file in the server directory:

setup env in server
.env
MONGO_URI=mongodb://localhost:27017/blog-editor
PORT=5000
JWT_SECRET=your_strong_jwt_secret_here

Start the backend server:

bash
npm run dev
3. Frontend Setup
bash
cd ../client
npm install
Start the frontend development server:

bash
npm start
The application should now be running at http://localhost:3000.
----------------------------------------------------------------------------------------------------------------

Project Structure
blog-editor/
├── client/                  # Frontend (React)
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.js          # Main application component
│   └── package.json        # Frontend dependencies
├── server/                 # Backend (Node.js/Express)
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── .env                # Environment variables
│   └── server.js          # Main server file
└── README.md              # This file


----------------------------------------------------------------------------------------------------------------

API Endpoints
Authentication
POST /api/auth/register - Register a new user

POST /api/auth/login - Login an existing user

Blogs
GET /api/blogs - Get all blogs for current user

GET /api/blogs/:id - Get a specific blog

POST /api/blogs/save-draft - Save or update a draft

POST /api/blogs/publish - Publish a blog

DELETE /api/blogs/:id - Delete a blog

----------------------------------------------------------------------------------------------------------------
Environment Variables
Backend (server/.env)
MONGO_URI - MongoDB connection string

PORT - Server port (default: 5000)

JWT_SECRET - Secret key for JWT tokens

Available Scripts
Backend (server/)
npm start - Start the production server

npm run dev - Start the development server with nodemon

npm test - Run tests (not currently implemented)

Frontend (client/)
npm start - Start the development server

npm build - Build for production

npm test - Run tests

npm eject - Eject from create-react-app

Deployment
Backend Deployment
Set up a MongoDB Atlas cluster or use another MongoDB hosting service

Update the MONGO_URI in your production environment variables

Deploy to your preferred hosting platform (Heroku, AWS, etc.)

Frontend Deployment
Run npm run build in the client directory

Deploy the build folder to your preferred static hosting (Netlify, Vercel, etc.)

Troubleshooting
Common Issues
MongoDB Connection Errors

Ensure MongoDB is running locally or the connection string is correct

Check firewall settings if connecting to a remote database

Authentication Errors

Verify JWT tokens are being sent in request headers

Check that the JWT_SECRET matches between server restarts

CORS Errors

Ensure the frontend is making requests to the correct backend URL

Verify CORS settings in the server configuration



