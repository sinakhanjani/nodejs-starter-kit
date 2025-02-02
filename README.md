# Starter Backend Project

## Description
This is a starter backend project built with **Node.js**. It includes authentication, WebSocket support, a modular structure for handling payments, user management, chat rooms, and more.

## Features
- **User Authentication** (JWT-based authentication, role management)
- **Real-time Chat** with WebSocket support
- **Payment Integration** with Zarinpal
- **REST API Structure** with Express
- **Database Support** for MongoDB (via Mongoose)
- **Task Management System**
- **Admin Panel API** for managing users & transactions
- **Error Handling & Middleware Architecture**
- **Logging & Debugging Tools**

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/starter-backend.git
   cd starter-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Setup environment variables:
   - Copy `.env.example` to `.env` and fill in the required variables.

4. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a JWT token
- `GET /api/users/me` - Get authenticated user details
- `GET /api/chat/rooms` - Get chat rooms
- `POST /api/chat/message` - Send a chat message
- `POST /api/payment/pay` - Initiate a payment

## Testing
To run tests, use:
```sh
npm test
```

## Contributing
Feel free to submit pull requests and report issues!

## License
MIT

