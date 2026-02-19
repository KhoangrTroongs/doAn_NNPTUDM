# Cake Store - Premium Bakery E-commerce

A full-stack e-commerce application for a cake store built with Node.js, Express, MongoDB, and React.

## Features

### User Features
- 🔐 User registration and login with JWT authentication
- 🍰 Browse premium cakes catalog
- 🛒 Add products to shopping cart
- 💳 View cart and calculate total

### Admin Features
- 📊 Admin dashboard
- ➕ Create new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📦 Manage inventory (stock levels)

### Design
- 🎨 Premium dark theme with glassmorphism
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎭 Modern gradient color palette

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with custom design system

## Project Structure

```
Doan/
├── bin/                    # Server startup script
├── routes/                 # API routes
│   ├── products.js        # Product CRUD endpoints
│   └── users.js           # Auth & cart endpoints
├── schemas/               # MongoDB schemas
│   ├── Product.js         # Product model
│   └── User.js            # User model with cart
├── utils/                 # Utilities
│   └── db.js              # Database connection
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api.js         # API service layer
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   └── package.json
├── app.js                 # Express app setup
└── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- MongoDB Compass (optional, for database management)

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (already created):
```
JWT_SECRET=your_secret_key_here_change_in_production
PORT=3001
```

3. Make sure MongoDB is running with database name `cakestore`

4. Create admin account (one-time setup):
```bash
# Start the server first, then make a POST request to:
# POST http://localhost:3001/users/setup-admin
# This creates: username: admin, password: admin123
```

5. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `POST /users/setup-admin` - Create admin account (one-time)

### Products
- `GET /products` - Get all products
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

### Cart
- `GET /users/cart` - Get user's cart
- `POST /users/cart` - Add item to cart

## Default Credentials

### Admin Account
- **Username:** admin
- **Password:** admin123

(Create this account by calling `/users/setup-admin` endpoint after starting the server)

## Usage

1. **Start MongoDB** (make sure it's running on port 27017)

2. **Start Backend Server:**
   ```bash
   npm start
   ```

3. **Start Frontend (in new terminal):**
   ```bash
   cd client
   npm run dev
   ```

4. **Create Admin Account:**
   - Use Postman or similar tool
   - POST to `http://localhost:3001/users/setup-admin`
   - Or use the browser console to make the request

5. **Access the Application:**
   - Open browser to `http://localhost:3000`
   - Register as a regular user or login as admin

## Role-Based Access

### User Role
- Can view products
- Can add products to cart
- Can view cart
- Cannot access admin dashboard

### Admin Role
- Can view products
- Can create/edit/delete products
- Can manage inventory
- Cannot add items to cart
- Has access to admin dashboard

## Development Notes

- Backend runs on port **3001**
- Frontend runs on port **3000**
- Vite proxy configured to forward `/api` requests to backend
- JWT tokens stored in localStorage
- MongoDB database name: **cakestore**

## Future Enhancements

- Order management system
- Payment integration
- Product reviews and ratings
- Image upload functionality
- Email notifications
- Advanced search and filtering
- Wishlist feature
- Order history

## License

MIT
