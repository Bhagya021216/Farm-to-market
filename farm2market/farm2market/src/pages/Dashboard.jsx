import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext.jsx";
import { AnalyticsAPI } from "../services/api.js";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import StatCard from "../components/StatCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
	const { token } = useAuth();
	const [monthlySales, setMonthlySales] = useState([]);
	const [topCustomers, setTopCustomers] = useState([]);
	const [topProducts, setTopProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [sellerStats, setSellerStats] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [salesRes, customersRes, productsRes, statsRes] = await Promise.all([
					AnalyticsAPI.getMonthlySales(token),
					AnalyticsAPI.getTopCustomers(token),
					AnalyticsAPI.getTopProducts(token),
					AnalyticsAPI.getSellerStats(token),
				]);
				setMonthlySales(salesRes);
				setTopCustomers(customersRes);
				setTopProducts(productsRes);
				setSellerStats(statsRes);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [token]);

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const [salesByMonth, setSalesByMonth] = useState(Array(12).fill(0));
	const [totalRevenue, setTotalRevenue] = useState(0);

	useEffect(() => {
		const arr = Array(12).fill(0);
		(Array.isArray(monthlySales) ? monthlySales : []).forEach((s) => {
			let monthStr = s?.month || "";
			let idx = -1;
			if (monthStr) {
				idx = months.findIndex((m) => m.toLowerCase() === monthStr.toLowerCase());
			} else if (s?._id) {
				const parts = s._id.split("-");
				if (parts.length > 1 && !isNaN(parseInt(parts[1], 10))) {
					idx = parseInt(parts[1], 10) - 1;
				}
			}
			if (idx >= 0 && idx < 12) arr[idx] = s?.totalRevenue || 0;
		});
		setSalesByMonth(arr);
		setTotalRevenue(arr.reduce((a, b) => a + (b || 0), 0));
	}, [monthlySales]);

	const chartData = {
		labels: months,
		datasets: [
			{
				label: "Revenue (Rs)",
				data: salesByMonth,
				backgroundColor: "rgba(34, 197, 94, 0.5)",
				borderColor: "rgba(34, 197, 94, 1)",
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Revenue (Rs)",
				},
			},
			x: {
				title: {
					display: true,
					text: "Month",
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (context) => `Rs ${context.parsed.y.toFixed(2)}`,
				},
			},
		},
	};

	return (
		<div className="max-w-6xl mx-auto px-4 pt-8">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Dashboard Overview</h1>
				<p className="text-gray-600">Your farm's performance at a glance</p>
			</div>
			{loading ? (
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
			) : error ? (
				<div className="text-red-600">{error}</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						{(() => {
							const cur = sellerStats?.currentMonth || {};
							const last = sellerStats?.lastMonth || {};
							function percentChange(curVal, lastVal) {
								if (lastVal === 0 && curVal === 0) return 0;
								if (lastVal === 0) return 100;
								return ((curVal - lastVal) / Math.abs(lastVal)) * 100;
							}
							const revChange = percentChange(cur.totalRevenue ?? 0, last.totalRevenue ?? 0);
							const orderChange = percentChange(cur.totalItemsSold ?? 0, last.totalItemsSold ?? 0);
							const avgChange = percentChange(cur.averageOrderTotal ?? 0, last.averageOrderTotal ?? 0);
							return (
								<>
									<StatCard
										title="Total Revenue"
										value={`Rs ${
											cur.totalRevenue?.toLocaleString(undefined, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											}) || "0.00"
										}`}
										sub={
											<span className={revChange >= 0 ? "text-green-500" : "text-red-500"}>
												{revChange >= 0 ? "+" : ""}
												{revChange.toFixed(1)}% vs Last Month
											</span>
										}
									/>
									<StatCard
										title="New Orders"
										value={cur.totalItemsSold ?? 0}
										sub={
											<span className={orderChange >= 0 ? "text-green-500" : "text-red-500"}>
												{orderChange >= 0 ? "+" : ""}
												{orderChange.toFixed(1)}% vs Last Month
											</span>
										}
									/>
									<StatCard
										title="Avg. Order Value"
										value={`Rs ${
											cur.averageOrderTotal?.toLocaleString(undefined, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											}) || "0.00"
										}`}
										sub={
											<span className={avgChange >= 0 ? "text-green-500" : "text-red-500"}>
												{avgChange >= 0 ? "+" : ""}
												{avgChange.toFixed(1)}% vs Last Month
											</span>
										}
										color="text-black"
										subColor={avgChange >= 0 ? "text-green-500" : "text-red-500"}
									/>
								</>
							);
						})()}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div className="md:col-span-2 bg-white rounded-xl shadow p-6 flex flex-col">
							<div className="flex items-center justify-between mb-2">
								<div className="font-semibold text-lg">Monthly Sales</div>
								<span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">This Year</span>
							</div>
							<div className="text-sm text-gray-500 mb-2">
								Total:{" "}
								<span className="font-semibold text-black">
									Rs{" "}
									{totalRevenue.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
							<div className="h-64">
								<Bar data={chartData} options={chartOptions} />
							</div>
						</div>
						<div className="bg-white rounded-xl shadow p-6">
							<div className="font-semibold mb-2">Top Customers</div>
							<ul className="space-y-2">
								{(Array.isArray(topCustomers) ? topCustomers : []).map((c, i) => (
									<li key={c?._id?._id || i} className="flex justify-between items-center text-sm">
										<span>{c?._id?.name || "-"}</span>
										<span className="text-green-600 font-semibold">
											Rs {typeof c?.totalSpent === "number" ? c.totalSpent.toFixed(2) : "0.00"}
										</span>
									</li>
								))}
								{(!Array.isArray(topCustomers) || topCustomers.length === 0) && (
									<li className="text-gray-400">No data</li>
								)}
							</ul>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white rounded-xl shadow p-6">
							<div className="font-semibold mb-2">Top Products</div>
							<ul className="space-y-2">
								{(Array.isArray(topProducts) ? topProducts : []).map((p, i) => (
									<li key={p?._id?._id || i} className="flex justify-between items-center text-sm">
										<span>{p?._id?.name || "-"}</span>
										<span className="text-green-600 font-semibold">
											{typeof p?.totalSold === "number" ? p.totalSold : 0} sold
										</span>
									</li>
								))}
								{(!Array.isArray(topProducts) || topProducts.length === 0) && (
									<li className="text-gray-400">No data</li>
								)}
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
