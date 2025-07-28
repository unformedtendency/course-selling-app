# Course Selling App 

A simple REST API built with Node.js, Express, and MongoDB that enables users to sign up, sign in, purchase courses, and view their purchases. Admins can upload new courses.

## ✨ Features

- User Signup & Login (JWT-based)
- Admin Signup & Login
- Browse and Purchase Courses
- View Purchased Courses
- Secure Routes using Middleware
- MongoDB for data storage (via Mongoose)

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)

## 🧪 API Endpoints

### User

- `POST /api/v1/user/signup` – Create a new user
- `POST /api/v1/user/signin` – Login and get JWT
- `GET /api/v1/user/purchases` – View purchased courses

### Admin

- `POST /api/v1/admin/signup`
- `POST /api/v1/admin/signin`

### Courses

- `GET /api/v1/course/preview` – Preview all available courses
- `POST /api/v1/course/purchase` – Purchase a course (JWT protected)

## ⚙️ Setup

```bash
npm install
# Set your MongoDB connection string in .env file:
# MONGO_URL=mongodb://localhost:27017/course-selling
node index.js
