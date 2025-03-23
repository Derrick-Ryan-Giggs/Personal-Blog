# MERN Blog Platform

A full-stack personal blog platform built with the MERN stack (MongoDB, Express, React, Node.js), featuring modern deployment and DevOps practices.

## 🚀 Features

- User authentication (register, login, profile management)
- Create, edit, publish, and delete blog posts
- Tag posts and filter by tags
- Responsive design with Tailwind CSS
- Comprehensive monitoring and error tracking
- Secure configuration with environment variables
- CI/CD pipeline with GitHub Actions

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB database (local or Atlas)
- Git

## 🛠️ Tech Stack

### Backend
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Winston (logging)
- PM2 (process management)

### Frontend
- React with Vite
- React Router
- Tailwind CSS
- Axios
- Sentry (error tracking)

### DevOps
- GitHub Actions (CI/CD)
- Render (hosting)
- PM2 (process management)

## 🔧 Installation & Setup

### Clone the repository

```bash
git clone https://github.com/Derrick-Ryan-Giggs/mern-blog-platform.git
cd mern-blog-platform
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file with the following variables
# NODE_ENV=development
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

# Run development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file with the following variables
# VITE_API_URL=http://localhost:5000
# VITE_SENTRY_DSN=your_sentry_dsn (optional for development)

# Run development server
npm run dev
```

## 🚢 Deployment Process

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables in Render dashboard

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: dist
   - Add environment variables in Vercel dashboard

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. On every push to main branch:
   - Backend tests are run
   - Frontend is built and tested
   - If all tests pass, deployment is triggered

2. On pull requests:
   - All tests are run
   - Build verification is performed
   - Status checks must pass before merging

## 📊 Monitoring & Logging

### Backend Monitoring

- Winston for structured logging
- Log files stored in `/logs` directory
- Render dashboard provides resource usage metrics

### Frontend Monitoring

- Sentry for error tracking and performance monitoring
- React DevTools for component debugging
- Lighthouse for performance analysis

## 🔒 Security Considerations

- JWT authentication with secure cookie storage
- HTTPS enforcement in production
- Environment variables for sensitive credentials
- API rate limiting to prevent abuse
- Data sanitization against XSS and NoSQL injection
- Security headers with Helmet.js

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add an amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.