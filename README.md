# Chat Application with Authentication

This project is a chat application with user authentication and profile management.

GitHub Repository: [https://github.com/raditself/y](https://github.com/raditself/y)


# Browser-based AI Chat Application

This project is a browser-based AI chat application using TensorFlow.js for a custom AI model, with user authentication and a backend server.

## Features

- Real-time chat interface
- Custom AI model using TensorFlow.js
- User authentication (register/login)
- Express.js backend server
- Responsive design

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   node server.js
   ```
4. Open `index.html` in a web browser

## Future Improvements

- Enhance the AI model further
- Implement persistent storage for user accounts and chat history
- Add real-time chat functionality using WebSockets
- Improve error handling and input validation
- Implement more secure authentication practices (e.g., password complexity requirements, email verification)


## Features

- User registration with password strength requirements
- User login with JWT authentication
- Protected chat interface
- User profile management
- Password change functionality

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/raditself/y.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   node server.js
   ```

4. Open the application in your web browser at `http://localhost:3000`

## API Endpoints

- POST /register - Register a new user
- POST /login - Login and receive a JWT token
- GET /protected - Access protected route (requires authentication)
- POST /change-password - Change user password (requires authentication)

