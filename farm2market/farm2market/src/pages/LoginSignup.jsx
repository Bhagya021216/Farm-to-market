import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthAPI, UserAPI } from "../services/api.js";
import { useAuth } from "../store/AuthContext.jsx";

export default function LoginSignup() {
	const [mode, setMode] = useState("login");
	const [email, setEmail] = useState("alice@example.com");
	const [password, setPassword] = useState("Password123");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const { setToken, setUser } = useAuth();
	const from = location.state?.from?.pathname || "/profile";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			if (mode === "signup") {
				await AuthAPI.signup({ email, password });
			}
			const data = await AuthAPI.login({ email, password });
			const token = data.token;
			setToken(token);
			if (data.user && data.user.id) {
				try {
					const userDetails = await UserAPI.getById(token, data.user.id);
					setUser(userDetails);
				} catch {
					setUser({ email });
				}
			} else {
				try {
					const me = await UserAPI.me(token);
					setUser(me);
				} catch {
					setUser({ email });
				}
			}
			navigate(from, { replace: true });
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-16">
			<div className="mx-auto max-w-md card">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">
						{mode === "login" ? "Welcome back" : "Create your account"}
					</h2>
					<button
						className="text-brand-700 underline"
						onClick={() => setMode(mode === "login" ? "signup" : "login")}>
						{mode === "login" ? "Sign up" : "Log in"}
					</button>
				</div>
				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div>
						<label className="label">Email</label>
						<input
							className="input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							required
						/>
					</div>
					<div>
						<label className="label">Password</label>
						<input
							className="input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							required
						/>
					</div>
					{error && <div className="text-sm text-red-600">{error}</div>}
					<button disabled={loading} className="btn-primary w-full">
						{loading ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
					</button>
				</form>
				<p className="text-xs text-gray-500 mt-3">
					On successful {mode}, you will be redirected to complete your profile.
				</p>
			</div>
		</div>
	);
}
