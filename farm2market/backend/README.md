# Farm2Market Backend

Simple Node.js + Express + MongoDB API for Farm2Market.

## Features
- Auth: Signup, Login (JWT)
- Users: Update profile (role buyer/seller, address), Get seller details
- Products: Add product, List products with filters, View my products (seller)
- Orders: Place order, View my orders (buyer)
- CORS enabled

## Tech
- Node.js, Express, Mongoose, JWT, bcryptjs, CORS, dotenv

## Setup
```bash
npm install
cp .env.example .env
# edit .env for your Mongo connection & JWT secret
npm run dev
```
Server starts on `http://localhost:${PORT || 5000}`.

## Endpoints (base: /api)
### Auth
- POST `/auth/signup` { email, password }
- POST `/auth/login`  { email, password } -> { token }

### Users
- PUT `/users/me` (Bearer token) body: { name, role: "buyer"|"seller", address: { line1, line2, suburb, province } }
- GET `/users/seller/:id` -> basic seller info

### Products
- POST `/products` (seller token) body: { name, description, uom, quantityAvailable, imageUrl, suburb }
- GET `/products?sellerId=&suburb=&isAvailable=true|false&name=search`
- GET `/products/mine` (seller token)

### Orders
- POST `/orders` (buyer token) body: { productId, quantity }
- GET `/orders/mine` (buyer token)

## Notes
- For demo simplicity, no role guard is enforced on actions, but you can add checks to restrict: e.g., only sellers can POST /products.
- Basic stock deduction on order placement.
