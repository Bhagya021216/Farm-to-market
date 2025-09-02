import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import BrowseProducts from "./pages/BrowseProducts.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
	return (
		<div className="min-h-screen flex flex-col bg-green-50">
			<Navbar />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/browse-products" element={<BrowseProducts />} />
					<Route path="/login" element={<LoginSignup />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/cart"
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/orders"
						element={
							<ProtectedRoute>
								<Orders />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/add-product"
						element={
							<ProtectedRoute>
								<AddProduct />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}
