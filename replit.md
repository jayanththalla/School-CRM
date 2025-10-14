# School CRM System - Replit Setup

## Overview
This is a comprehensive School CRM (Customer Relationship Management) system designed to streamline communication and management between parents, students, and school administrators. The system provides features for tracking student attendance, managing assignments, viewing exam results, and more.

## Project Status
✅ Successfully imported from GitHub and configured for Replit environment
- Frontend and backend are running successfully
- All dependencies installed
- Development environment configured
- Deployment settings configured

## Recent Changes (October 14, 2025)
- Installed Node.js 20 and all project dependencies
- Configured frontend to run on port 5000 with proper Replit host settings
- Configured backend to run on port 3001 to avoid port conflicts
- Updated CORS settings to support Replit domains
- Created environment files for both frontend and backend
- Set up workflows for automated development server startup
- Configured deployment for production use
- Updated .gitignore to protect sensitive files

## Project Architecture

### Technology Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js (Node.js)
- **Database**: In-memory storage (ready for MongoDB integration)
- **Authentication**: JWT-based with OTP email verification

### Directory Structure
```
.
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/   # React components (Dashboard, Attendance, etc.)
│   │   ├── pages/        # Page components (Login, Signup, Home)
│   │   ├── contexts/     # React contexts (ThemeContext)
│   │   └── styles/       # Tailwind CSS styles
│   ├── vite.config.js   # Vite configuration
│   └── package.json
│
├── backend/           # Express.js backend API
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   └── package.json
│
└── replit.md          # This documentation file
```

### Port Configuration
- **Frontend (Development)**: Port 5000 - Main web interface
- **Frontend (Production)**: Port 5000 - Vite preview server
- **Backend**: Port 3001 - REST API server

### Key Features
1. **Parent Signup and Login** - Email-based registration with OTP verification
2. **Student Profile** - Comprehensive student information display
3. **Dashboard** - Timetable, notifications, fee status, attendance overview
4. **Class Diary** - Calendar-based diary with subject-wise entries
5. **Mock Tests** - Interactive MCQ tests with scoring
6. **Assignments** - Assignment submission with file upload support
7. **Attendance** - Calendar view with attendance tracking
8. **Exams and Marks** - Exam results and performance tracking
9. **Performance Analytics** - Visual charts and analytics
10. **Theme Support** - Light/Dark mode toggle

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

Note: The frontend uses a relative API URL (/api) because Vite's dev server proxies these requests to the backend on port 3001.

### Backend (.env)
```
PORT=3001
JWT_SECRET=school-crm-jwt-secret-key-change-in-production
NODE_ENV=development
CORS_ORIGINS=http://localhost:5000,https://[replit-domain]
```

## Development Workflow

### Running the Application
The application uses two workflows that start automatically:
1. **Frontend** - Serves the React application on port 5000
2. **Backend** - Runs the API server on port 3001

Both workflows start automatically when you open the Repl.

### Making Changes
1. Edit files in the `frontend/src/` directory for UI changes
2. Edit files in the `backend/` directory for API changes
3. Hot reload is enabled - changes will reflect automatically
4. The backend generates sample data on startup for testing

### Installing Dependencies
```bash
# Frontend dependencies
cd frontend && npm install [package-name]

# Backend dependencies
cd backend && npm install [package-name]
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Parent registration
- POST `/api/auth/verify-signup` - Verify OTP for signup
- POST `/api/auth/login` - Send login OTP
- POST `/api/auth/verify-login` - Verify OTP for login

### Student Data
- GET `/api/attendance/:studentId` - Get attendance records
- GET `/api/exams/:studentId` - Get exam records
- GET `/api/analytics/:studentId` - Get performance analytics

### Health Check
- GET `/api/health` - Server health status

## Deployment Configuration
The project is configured for Autoscale deployment:
- **Build**: Installs dependencies and builds frontend (npm install & npm run build)
- **Run**: Starts backend API server on port 3001 and production proxy server on port 5000
- Production uses `backend/server-production.js` which serves frontend static files and proxies /api to backend
- The proxy server handles both static file serving and API routing in production
- Frontend is accessible on port 5000 in both dev and production

## Future Enhancements
- MongoDB database integration (currently uses in-memory storage)
- Real-time notifications with WebSockets
- Google OAuth integration (requires GOOGLE_CLIENT_ID setup)
- File upload functionality for assignments
- Email service integration for OTP delivery
- Performance tracking and detailed analytics

## Troubleshooting

### Frontend not loading
1. Check if Frontend workflow is running
2. Verify port 5000 is accessible
3. Check browser console for errors

### Backend API errors
1. Check if Backend workflow is running
2. Verify port 3001 is accessible
3. Check backend logs for errors

### CORS errors
1. Ensure CORS_ORIGINS in backend .env includes your Replit domain
2. Verify the CORS middleware configuration in `backend/middlewares/cors.js`

### Environment variables not loading
1. Ensure .env files exist in both frontend and backend directories
2. Restart the workflows after changing .env files
3. Verify VITE_ prefix for frontend environment variables

## Notes
- The system currently uses in-memory storage for development
- Sample data is generated automatically on server startup
- Email OTP functionality requires email service configuration
- Google OAuth requires proper client ID setup
- All sensitive files (.env) are excluded from version control
