import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";
import { ProductAPI } from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function BrowseProducts() {
	const { user, token } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState(location?.state?.category || "");
	const [sort, setSort] = useState("");
	const [isNearby, setIsNearby] = useState(false);

	useEffect(() => {
		if (location?.state?.category) {
			setCategory(location?.state?.category);
		}
	}, [location.state]);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const list = await ProductAPI.list(category, isNearby, user?.address?.suburb);
				setProducts(list || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [category, isNearby]);

	useEffect(() => {
		console.log("Products updated:", products);
	}, [products]);

	let filtered = products.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()));
	if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
	if (sort === "price") filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));

	return (
		<div className="max-w-6xl mx-auto px-4 pt-8">
			<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex flex-col items-start">
					<h1 className="text-3xl font-bold">Browse Fresh Products</h1>
					<p className="text-gray-600">Find fresh produce from local farmers</p>
				</div>
				{user?.role === "seller" && token && (
					<button
						type="button"
						onClick={() => navigate("/add-product")}
						className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2 self-end md:self-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
						</svg>
						Add Product
					</button>
				)}
			</div>
			<div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-center gap-4 mb-8">
				<input
					type="text"
					placeholder={`Search ${category || "products"}...`}
					className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<select
					className="border rounded-lg px-3 py-2"
					value={category}
					onChange={(e) => setCategory(e.target.value)}>
					<option value="">All Categories</option>
					<option value="vegetable">Vegetables</option>
					<option value="fruit">Fruits</option>
					<option value="grain">Grains</option>
					<option value="meat">Meats</option>
				</select>
				<select className="border rounded-lg px-3 py-2" value={sort} onChange={(e) => setSort(e.target.value)}>
					<option value="">Sort by</option>
					<option value="name">Name</option>
					<option value="price">Price</option>
				</select>
				<label className="flex items-center gap-2 text-sm">
					<input
						type="checkbox"
						checked={isNearby}
						onChange={(e) => setIsNearby(e.target.checked)}
						className="accent-green-600"
					/>
					Nearby Only
				</label>
			</div>
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
			{error && <div className="text-red-600">{error}</div>}
			{!loading && filtered.length === 0 && (
				<div className="text-center text-gray-500 py-10">No products found.</div>
			)}
			{!loading && filtered.length > 0 && (
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filtered.map((p) => (
						<ProductCard key={p._id || p.id || p.name} product={p} />
					))}
				</div>
			)}
		</div>
	);
}
