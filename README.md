Blog Editor Application

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






Environment Variables

Backend (server/.env)
MONGO_URI - MongoDB connection string
PORT - Server port (default: 5000)
JWT_SECRET - Secret key for JWT tokens

