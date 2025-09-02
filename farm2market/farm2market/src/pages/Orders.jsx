import { useEffect, useState } from "react";
import { OrderAPI } from "../services/api.js";
import { useAuth } from "../store/AuthContext.jsx";

export default function Orders() {
	const { token, user } = useAuth();
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!token || !user?._id) return;
		const load = async () => {
			setLoading(true);
			try {
				const list = await OrderAPI.list(token, user._id);
				setOrders(Array.isArray(list) ? list : list?.orders || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [token, user]);

	return (
		<div className="max-w-6xl mx-auto px-4 pt-8">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">My Orders</h1>
				<p className="text-gray-600">Track your recent purchases and order status</p>
			</div>
			{error && <div className="text-red-600">{error}</div>}
			<div className="grid gap-4">
				{loading && (
					<div className="flex justify-center items-center py-10">
						<svg
							className="animate-spin h-8 w-8 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
						</svg>
					</div>
				)}
				{!loading && orders.length === 0 && <div className="card">No orders yet.</div>}
				{!loading &&
					orders.map((o, idx) => (
						<div key={o._id || idx} className="card">
							<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
								<div>
									<div className="font-semibold">Order ID: {o._id}</div>
									<div className="text-sm text-gray-600">
										Order Total:{" "}
										<span className="font-bold">Rs {Number(o.orderTotal).toFixed(2)}</span>
									</div>
									<div className="text-xs text-gray-500">
										Placed: {o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}
									</div>
								</div>
								<div className="text-sm text-gray-500 ml-auto">Status: {o.status || "placed"}</div>
							</div>
							<div className="border-t pt-2 mt-2">
								<div className="font-semibold mb-1">Items:</div>
								<div className="grid grid-cols-3 gap-2 text-sm font-semibold text-gray-700 mb-1">
									<div>Product</div>
									<div className="text-center">Quantity</div>
									<div className="text-right">Line Total</div>
								</div>
								<div className="divide-y">
									{Array.isArray(o.products) &&
										o.products.map((item, iidx) => (
											<div
												key={item._id || iidx}
												className="grid grid-cols-3 gap-2 text-sm py-1 items-center">
												<div>{item.product?.name || "-"}</div>
												<div className="text-center">{item.quantity}</div>
												<div className="text-right">Rs {Number(item.total).toFixed(2)}</div>
											</div>
										))}
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
