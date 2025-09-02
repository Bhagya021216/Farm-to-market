import { useState } from "react";
import { ProductAPI } from "../services/api.js";
import { useAuth } from "../store/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
	const { token } = useAuth();
	const [form, setForm] = useState({
		name: "",
		description: "",
		uom: "kg",
		quantityAvailable: 0,
		suburb: "",
		price: "",
		type: "Vegetable",
	});
	const [imageFile, setImageFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImageFile(file || null);
	};

	const validate = () => {
		if (!form.price || isNaN(form.price)) return "Price is required.";
		const priceNum = Number(form.price);
		if (priceNum <= 0) return "Price must be greater than 0.";
		if (!/^\d+(\.\d{1,2})?$/.test(form.price)) return "Price must have at most 2 decimal places.";
		return "";
	};

	const submit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}
		setLoading(true);
		try {
			let payload = { ...form, price: Number(form.price), type: form.type.toLowerCase() };
			if (imageFile) {
				const base64 = await toBase64(imageFile);
				payload.image = base64.split(",")[1];
				payload.imageType = imageFile.type;
			}
			const saved = await ProductAPI.add(token, payload);
			if (saved != null && saved._id != null) navigate("/");
			setSuccess("Product published!");
			setForm({ name: "", description: "", uom: "kg", quantityAvailable: 0, suburb: "", price: "" });
			setImageFile(null);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	function toBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-10">
			<div className="card">
				<h2 className="text-lg font-semibold">Add Product</h2>
				<form onSubmit={submit} className="mt-4 grid md:grid-cols-2 gap-4">
					<div>
						<label className="label">Name</label>
						<input
							className="input"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							required
						/>
					</div>
					<div>
						<label className="label">Type</label>
						<select
							className="input"
							value={form.type}
							onChange={(e) => setForm({ ...form, type: e.target.value })}
							required>
							<option value="Vegetable">Vegetable</option>
							<option value="Fruit">Fruit</option>
							<option value="Grain">Grains</option>
							<option value="Meat">Meat</option>
						</select>
					</div>
					<div>
						<label className="label">UOM</label>
						<select
							className="input"
							value={form.uom}
							onChange={(e) => setForm({ ...form, uom: e.target.value })}>
							<option value="kg">kg</option>
							<option value="lb">lb</option>
							<option value="pcs">pcs</option>
						</select>
					</div>
					<div>
						<label className="label">Quantity Available</label>
						<input
							type="number"
							className="input"
							value={form.quantityAvailable}
							onChange={(e) => setForm({ ...form, quantityAvailable: Number(e.target.value) })}
							required
						/>
					</div>
					<div>
						<label className="label">Suburb</label>
						<input
							className="input"
							value={form.suburb}
							onChange={(e) => setForm({ ...form, suburb: e.target.value })}
						/>
					</div>
					<div>
						<label className="label">Price</label>
						<input
							className="input"
							type="number"
							min="0.01"
							step="0.01"
							value={form.price}
							onChange={(e) => setForm({ ...form, price: e.target.value })}
							required
							placeholder="e.g. 2.50"
						/>
					</div>
					<div className="md:col-span-2">
						<label className="label">Image</label>
						<input type="file" accept="image/*" className="input" onChange={handleImageChange} />
					</div>
					<div className="md:col-span-2">
						<label className="label">Description</label>
						<textarea
							className="input"
							rows="3"
							value={form.description}
							onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
					</div>
					{error && <div className="md:col-span-2 text-sm text-red-600">{error}</div>}
					{success && <div className="md:col-span-2 text-sm text-green-700">{success}</div>}
					<div className="md:col-span-2">
						<button disabled={loading} className="btn-primary">
							{loading ? "Publishing..." : "Publish listing"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
