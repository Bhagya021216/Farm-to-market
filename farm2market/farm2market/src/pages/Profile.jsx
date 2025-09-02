import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";
import { UserAPI } from "../services/api.js";

export default function Profile() {
	const { token, user, setUser } = useAuth();
	const [form, setForm] = useState({
		name: user?.name || "",
		role: user?.role || "seller",
		address: user?.address || { line1: "", line2: "", suburb: "", province: "" },
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user.name) return;
		const load = async () => {
			try {
				const me = await UserAPI.me(token);
				setUser(me);
				setForm({
					name: me?.name || "",
					role: me?.role || "seller",
					address: me?.address || { line1: "", line2: "", suburb: "", province: "" },
				});
			} catch {}
		};
		load();
	}, []);

	const save = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await UserAPI.updateMe(token, form);
			setUser(res);
			navigate("/");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<div className="grid md:grid-cols-2 gap-6">
				<div className="card">
					<h2 className="text-lg font-semibold">Complete your profile</h2>
					<form onSubmit={save} className="mt-4 space-y-4">
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
							<label className="label">Role</label>
							<select
								className="input"
								value={form.role}
								onChange={(e) => setForm({ ...form, role: e.target.value })}
								disabled={!!user?.role}>
								<option value="buyer">Buyer</option>
								<option value="seller">Farmer</option>
							</select>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="label">Address line 1</label>
								<input
									className="input"
									value={form.address.line1}
									onChange={(e) =>
										setForm({ ...form, address: { ...form.address, line1: e.target.value } })
									}
								/>
							</div>
							<div>
								<label className="label">Address line 2</label>
								<input
									className="input"
									value={form.address.line2}
									onChange={(e) =>
										setForm({ ...form, address: { ...form.address, line2: e.target.value } })
									}
								/>
							</div>
							<div>
								<label className="label">Suburb</label>
								<input
									className="input"
									value={form.address.suburb}
									onChange={(e) =>
										setForm({ ...form, address: { ...form.address, suburb: e.target.value } })
									}
								/>
							</div>
							<div>
								<label className="label">Province</label>
								<input
									className="input"
									value={form.address.province}
									onChange={(e) =>
										setForm({ ...form, address: { ...form.address, province: e.target.value } })
									}
								/>
							</div>
						</div>
						{error && <div className="text-sm text-red-600">{error}</div>}
						<button disabled={loading} className="btn-primary w-full">
							{loading ? "Saving..." : "Save & Go Home"}
						</button>
					</form>
				</div>
				<div className="card">
					<h3 className="font-semibold">Why we need this?</h3>
					<p className="text-sm text-gray-600 mt-2">
						Your role decides what you can do in the app. Farmers add products. Sellers browse, add to cart
						and order.
					</p>
				</div>
			</div>
		</div>
	);
}
