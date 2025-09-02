import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext.jsx";
import { useAuth } from "../store/AuthContext.jsx";
import { OrderAPI } from "../services/api.js";
import { useState } from "react";

export default function Cart() {
	const { items, updateQty, removeFromCart, clearCart } = useCart();
	const { token } = useAuth();
	const [placing, setPlacing] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const placeOrders = async () => {
		setError("");
		setPlacing(true);
		try {
			const products = items.map((item) => ({
				product: item._id || item.id,
				quantity: item.quantity,
				total: Number(item.price || 0) * item.quantity,
			}));
			const orderTotal = Number(products.reduce((sum, p) => sum + p.total, 0).toFixed(2));
			await OrderAPI.create(token, { products, orderTotal });
			clearCart();
			navigate("/orders");
		} catch (err) {
			setError(err.message);
		} finally {
			setPlacing(false);
		}
	};

	const totalItems = items.reduce((a, b) => a + b.quantity, 0);
	const cartTotal = items.reduce((sum, i) => sum + Number(i.price || 0) * i.quantity, 0);

	return (
		<div className="max-w-6xl mx-auto px-4 pt-8">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Your Cart</h1>
				<p className="text-gray-600">Review your selected items before placing an order</p>
			</div>
			{items.length === 0 ? (
				<div className="card">Your cart is empty.</div>
			) : (
				<div className="grid md:grid-cols-3 gap-6">
					<div className="md:col-span-2 space-y-3">
						{items.map((i) => (
							<div key={i._id} className="card flex items-center gap-4">
								<img
									src={
										i.imageUrl
											? `http://localhost:5000/api${i.imageUrl}`
											: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop"
									}
									alt={i.name}
									className="w-24 h-24 object-cover rounded-xl"
								/>
								<div className="flex-1">
									<div className="font-semibold flex justify-between items-center">
										<span>{i.name}</span>
									</div>
									<div className="text-sm text-gray-500">
										Available: {i.quantityAvailable} {i.uom}
									</div>
									<div className="text-xs text-gray-400 mt-1">
										Item Total: Rs {(Number(i.price || 0) * i.quantity).toFixed(2)}
									</div>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="number"
										min="1"
										className="input w-24"
										value={i.quantity}
										onChange={(e) => updateQty(i._id, Number(e.target.value))}
									/>
									<button className="btn-secondary" onClick={() => removeFromCart(i._id)}>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="card h-fit">
						<div className="font-semibold text-lg mb-2">Summary</div>
						<div className="text-sm text-gray-600 mb-1">Items: {totalItems}</div>
						<div className="text-sm text-gray-600 mb-1">
							Cart Total: <span className="font-bold">Rs {cartTotal.toFixed(2)}</span>
						</div>
						{error && <div className="text-sm text-red-600 mt-2">{error}</div>}
						<button disabled={placing} onClick={placeOrders} className="btn-primary w-full mt-4">
							{placing ? "Placing..." : "Place Order"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
