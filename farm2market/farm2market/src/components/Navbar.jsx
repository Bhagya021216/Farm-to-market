import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Leaf, User, Menu } from "lucide-react";
import { useAuth } from "../store/AuthContext.jsx";
import { useCart } from "../store/CartContext.jsx";

export default function Navbar() {
	const { token, user, logout } = useAuth();
	const { items } = useCart();
	const navigate = useNavigate();
	const count = items.reduce((a, b) => a + b.quantity, 0);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/");
		setMenuOpen(false);
	};

	return (
		<header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 relative">
				<Link to="/" className="flex items-center gap-2 font-bold text-lg">
					<span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-100 text-brand-700">
						<Leaf size={18} />
					</span>
					Farm2Market
				</Link>
				{/* Hamburger for mobile */}
				<button
					className="ml-auto md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
					onClick={() => setMenuOpen((v) => !v)}
					aria-label="Open menu"
				>
					<Menu size={26} />
				</button>
				{/* Desktop nav */}
				<nav className="ml-auto hidden md:flex items-center gap-3">
					<NavLink to="/" className="px-3 py-2 rounded-lg hover:bg-gray-100">
						Home
					</NavLink>
					<NavLink to="/browse-products" className="px-3 py-2 rounded-lg hover:bg-gray-100">
						Browse Products
					</NavLink>
					{user?.role === "seller" && (
						<>
							<NavLink to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-gray-100">
								Dashboard
							</NavLink>
							<NavLink
								to="/profile"
								className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2">
								<User size={18} /> {user?.name || "Profile"}
							</NavLink>
							<button onClick={handleLogout} className="btn-secondary">
								Logout
							</button>
						</>
					)}
					{user?.role === "buyer" && (
						<>
							<NavLink to="/orders" className="px-3 py-2 rounded-lg hover:bg-gray-100">
								Orders
							</NavLink>
							<NavLink
								to="/cart"
								className="relative px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2">
								<ShoppingCart size={18} />
								<span className="text-sm">Cart</span>
								{count > 0 && (
									<span className="absolute -top-1 -right-1 text-xs bg-brand-500 text-white rounded-full px-2">
										{count}
									</span>
								)}
							</NavLink>
							<NavLink
								to="/profile"
								className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2">
								<User size={18} /> {user?.name || "Profile"}
							</NavLink>
							<button onClick={handleLogout} className="btn-secondary">
								Logout
							</button>
						</>
					)}
					{!token && (
						<NavLink to="/login" className="btn-primary">
							Login / Signup
						</NavLink>
					)}
				</nav>
				{/* Mobile nav menu */}
				{menuOpen && (
					<nav className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-xl flex flex-col items-stretch p-4 gap-2 md:hidden animate-fade-in z-50">
						<NavLink to="/" className="px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
							Home
						</NavLink>
						<NavLink to="/browse-products" className="px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
							Browse Products
						</NavLink>
						{user?.role === "seller" && (
							<>
								<NavLink to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
									Dashboard
								</NavLink>
								<NavLink
									to="/profile"
									className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
									onClick={() => setMenuOpen(false)}
								>
									<User size={18} /> {user?.name || "Profile"}
								</NavLink>
								<button onClick={handleLogout} className="btn-secondary">
									Logout
								</button>
							</>
						)}
						{user?.role === "buyer" && (
							<>
								<NavLink to="/orders" className="px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
									Orders
								</NavLink>
								<NavLink
									to="/cart"
									className="relative px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
									onClick={() => setMenuOpen(false)}
								>
									<ShoppingCart size={18} />
									<span className="text-sm">Cart</span>
									{count > 0 && (
										<span className="absolute -top-1 -right-1 text-xs bg-brand-500 text-white rounded-full px-2">
											{count}
										</span>
									)}
								</NavLink>
								<NavLink
									to="/profile"
									className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
									onClick={() => setMenuOpen(false)}
								>
									<User size={18} /> {user?.name || "Profile"}
								</NavLink>
								<button onClick={handleLogout} className="btn-secondary">
									Logout
								</button>
							</>
						)}
						{!token && (
							<NavLink to="/login" className="btn-primary" onClick={() => setMenuOpen(false)}>
								Login / Signup
							</NavLink>
						)}
					</nav>
				)}
			</div>
		</header>
	);
}
