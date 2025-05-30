# Backend README

## Overview

The backend of **Elegant Jewels** is built with Node.js and Express, providing RESTful APIs for user authentication, profile management, wishlist, cart, and orders. MongoDB is used for data persistence, with Mongoose for schema modeling.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development Server](#development-server)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Additional Notes](#additional-notes)

## Prerequisites

- Node.js v16+ and npm v8+
- MongoDB instance (local or Atlas)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/elegant-jewels-backend.git
   cd elegant-jewels-backend
   ```

2. Install dependencies:
   ```bash
    npm install
    ```
## Environment Variables

Create a `.env` file in the project root and add your environment variables.
```bash
PORT = 3000
CLIENT_URL = http://localhost:5173
DB_CONNECT = your_mongo_db_connection_string
SECRET_KEY = your_jwt_secret_key
```
change the port number and client url to your own port and frontend url.

## Development Server
To start the development server, run:
```bash
node app.js
# or npm run dev 
# or npx nodemon 
```
This will start the development server for backend at `http://localhost:3000` or your own configured port.

## Production Build
To build the production version of the app, run:
```bash
npm start
# or yarn   
```
This will create a production build in the `dist` folder.

## Project Structure
The project structure is as follows:
```
jewels-backend/
├── controllers/
│   ├── cart.controller.js
│   ├── order.controller.js
│   ├── user.controller.js
│   └── wishlist.controller.js
├── middlewares/
│   └── auth.middleware.js
├── routes/
│   └── user.routes.js
├── db/
│   └── db.js
├── models/
│   └── user.model.js
├── scripts/
│   └── seedProducts.js  # (optional)
├── .env
├── app.js
├── package.json
└── README.md

```

## API Endpoints
All routes are prefixed with /api/users.

### Authentication & Profile
```bash

POST /api/users/register — Register a new user.

POST /api/users/login — Authenticate user and return a token.

GET /api/users/profile — Get user profile (requires auth).

PUT /api/users/address — Add or update shipping address (requires auth).

GET /api/users/logout — Log out user (requires auth).
```

### Wishlist

```bash

POST /api/users/wishlist — Add item to wishlist (requires auth).

GET /api/users/wishlist — Retrieve wishlist items (requires auth).

DELETE /api/users/wishlist/:id — Remove item from wishlist (requires auth).
```

### Cart

```bash

POST /api/users/cart — Add item to cart (requires auth).

GET /api/users/cart — Retrieve cart items (requires auth).

DELETE /api/users/cart/:id — Remove item from cart (requires auth).
```

### Orders

```bash
POST /api/users/order — Create a new order (requires auth).

GET /api/users/order — Retrieve user orders (requires auth).

DELETE /api/users/order/:id — Cancel an order (requires auth).
```

## Middleware
- CORS — Configured to allow requests from CLIENT_URL with credentials.

- Cookie Parser — Parses cookies for authentication tokens.

- Auth Middleware — Protects routes by verifying JWT tokens.

## Additional Notes
- Database Connection: db/db.js initializes MongoDB connection using Mongoose.

- Logging: Console logs show server status and port.

- Error Handling: Basic error responses included; consider extending with centralized error middleware.
