import { useCart } from "../store/CartContext.jsx";
import { useAuth } from "../store/AuthContext.jsx";

export default function ProductCard({ product }) {
	const { addToCart } = useCart();
	const { user } = useAuth();
	const canAdd = user?.role !== "seller";

	const imageSrc = product?.imageUrl
		? `http://localhost:5000/api${product.imageUrl}`
		: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop";
	const harvestedDate = product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "-";

	return (
		<div className="card flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full min-h-[410px] w-full max-w-sm mx-auto p-0">
			<img
				src={imageSrc}
				alt={product.name}
				className="h-56 w-full object-cover rounded-t-2xl m-0"
				style={{ display: "block" }}
			/>
			<div className="p-4 flex-1 flex flex-col justify-between">
				<div className="flex items-center justify-between mb-1">
					<h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
					{product.price && (
						<span className="text-green-700 font-semibold text-base ml-2">
							{typeof product.price === "number"
								? `Rs ${product.price.toFixed(2)}/${product.uom || "kg"}`
								: product.price}
						</span>
					)}
				</div>
				<div className="text-sm text-gray-500 mb-1">by {product.seller?.name || product.farmName || "-"}</div>
				<div className="flex items-center text-xs text-gray-500 gap-2 mb-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 inline-block"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
						/>
					</svg>
					<span>{product.suburb || product.seller?.address?.suburb || "-"}</span>
				</div>
				<div className="flex items-center text-xs text-gray-500 gap-2 mb-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 inline-block"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>Harvested {harvestedDate}</span>
				</div>
				<div className="text-xs text-gray-500 mb-2">
					{product.quantityAvailable} {product.uom || "kg"} available
				</div>
				<div className="flex-1 flex flex-col justify-end">
					{canAdd && (
						<button
							className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 mt-2 transition w-full"
							style={{ marginTop: "auto" }}
							onClick={() => addToCart(product, 1)}>
							Add to Cart
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
