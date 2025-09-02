# Farm2Market — React + Vite + Tailwind

A minimalist but robust UI implementing your flows: signup/login with JWT, profile update, product listing, add-to-cart, place orders, and order history. All API calls use your provided endpoints.

## Quick start

```bash
npm install
npm run dev
```

> Default API base URL is `http://localhost:5000/api`. Override with `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Pages

- `/login` – Combined Login/Signup. After auth → `/profile`
- `/profile` – Update name, role (farmer/seller), address → redirect home
- `/` – Product grid (GET `/products`), sellers can add to cart
- `/add-product` – For farmers only (POST `/products`)
- `/cart` – Place orders (POST `/orders` per item)
- `/orders` – View orders (GET `/orders`)

## Notes

- Token stored in `localStorage` key `token`.
- User profile cached under `user` in `localStorage`.
- Simple CartContext manages cart in `localStorage`.
- UI is Tailwind-based and easy to customize in `src/index.css`.
