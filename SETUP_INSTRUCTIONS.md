# School CRM Setup Instructions

## Overview

This School CRM system now includes:

- ✅ Clerk OAuth authentication (Google, GitHub, etc.)
- ✅ Improved light/dark mode switching
- ✅ MongoDB Atlas cluster integration
- ✅ Proper routing structure
- ✅ Demo login for testing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Clerk account (for OAuth)

## Setup Instructions

### 1. Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
# Create .env file in frontend directory
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
VITE_CLERK_SIGN_IN_URL=/login
VITE_CLERK_SIGN_UP_URL=/signup
VITE_CLERK_AFTER_SIGN_IN_URL=/dashboard
VITE_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

4. Start the development server:

```bash
npm run dev
```

### 2. Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
# Create .env file in backend directory
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://jayanththalla33:jayanththalla33@cluster0.qfpuofn.mongodb.net/school-crm?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:

```bash
npm run dev
```

### 3. Clerk Setup (OAuth Authentication)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Configure OAuth providers:
   - Go to "User & Authentication" → "Social Connections"
   - Enable Google, GitHub, etc.
4. Copy your publishable key to the frontend `.env` file
5. Copy your secret key to the backend `.env` file

### 4. MongoDB Setup

The MongoDB connection is already configured to use your cluster:

```
mongodb+srv://jayanththalla33:jayanththalla33@cluster0.qfpuofn.mongodb.net/school-crm?retryWrites=true&w=majority&appName=Cluster0
```

The database will be created automatically when you first run the application.

## Features

### Authentication

- **Demo Login**: Use demo accounts for testing
  - Email: `demo@school.com`, Password: `demo123`
  - Email: `parent@school.com`, Password: `parent123`
- **OAuth Login**: Sign in with Google, GitHub, etc. via Clerk

### Theme

- Toggle between light and dark modes
- Theme preference is saved in localStorage
- Automatic system theme detection

### Database

- MongoDB Atlas cluster integration
- Automatic schema creation
- User, attendance, exam, and assignment models

### Routing

- Clean route structure in `src/routes/AppRoutes.jsx`
- Protected routes for authenticated users
- Public routes for login/signup

## Development

### Running Both Frontend and Backend

1. **Terminal 1 (Backend)**:

```bash
cd backend
npm run dev
```

2. **Terminal 2 (Frontend)**:

```bash
cd frontend
npm run dev
```

### Access URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Production Deployment

1. Set `NODE_ENV=production` in backend environment
2. Update CORS origins for production domains
3. Use production Clerk keys
4. Deploy frontend to your hosting platform
5. Deploy backend to your server/hosting platform

## Troubleshooting

### Common Issues

1. **Clerk Authentication Not Working**:

   - Verify your Clerk publishable key is correct
   - Check that OAuth providers are enabled in Clerk dashboard
   - Ensure redirect URLs match your domain

2. **MongoDB Connection Issues**:

   - Verify your MongoDB connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

3. **Theme Not Working**:

   - Check if Tailwind CSS is properly configured
   - Verify the `darkMode: 'class'` setting in `tailwind.config.js`

4. **Routing Issues**:
   - Ensure all route components are properly imported
   - Check for typos in route paths
   - Verify React Router is properly configured

## Support

For issues or questions, please check:

1. Console logs for errors
2. Network tab for API failures
3. Clerk dashboard for authentication issues
4. MongoDB Atlas for database connectivity
