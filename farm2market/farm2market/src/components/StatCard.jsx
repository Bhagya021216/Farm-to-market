import React from "react";

export default function StatCard({ title, value, sub, color = "text-black", subColor = "text-green-500" }) {
	return (
		<div className="bg-white rounded-xl shadow p-6 flex flex-col items-start min-w-[180px]">
			<div className="text-xs font-medium text-gray-500 mb-1">{title}</div>
			<div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
			{sub && <div className={`text-xs font-medium ${subColor}`}>{sub}</div>}
		</div>
	);
}
