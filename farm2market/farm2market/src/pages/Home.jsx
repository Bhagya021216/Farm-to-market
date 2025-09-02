import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function Home() {
	const navigate = useNavigate();
	const { token } = useAuth();

	return (
		<div className="bg-green-50 min-h-screen">
			<section className="bg-[#f3fef6] border-b border-green-100 py-7">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-20">
					<div className="flex-1 w-full md:w-1/2 text-center md:text-left">
						<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold mt-2 mb-4 leading-tight">
							Fresh From
							<br />
							Farm to Your Store
						</h1>
						<p className="text-gray-600 mb-6 max-w-md mx-auto md:mx-0 text-base sm:text-lg lg:text-xl">
							Get the freshest produce and tasty treats from local farmers with direct-to-consumer and
							curated goods. Discover seasonal harvests, organic options, and specialty items delivered
							from the farm to your table. Support local agriculture and enjoy healthy, sustainable food
							every day.
						</p>
						<button
							type="button"
							onClick={() => navigate("/browse-products")}
							className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition w-full sm:w-auto">
							Shop now
						</button>
					</div>
					<div className="flex-1 w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
						<img
							src="/images/Selection.png"
							alt="Farm Illustration"
							className="rounded-2xl object-cover object-center shadow-md"
						/>
					</div>
				</div>
			</section>

			<section className="pb-7 pt-3 border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Search by Category</h2>
					<div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
						<div
							className="flex flex-col items-center bg-gray-50 rounded-xl p-4 border hover:shadow transition cursor-pointer"
							onClick={() => navigate("/browse-products", { state: { category: "vegetable" } })}>
							<img
								src="/images/vegetables.png"
								alt="Vegetables"
								className="w-20 h-20 object-contain mb-2"
							/>
							<span className="font-semibold">Vegetables</span>
						</div>
						<div
							className="flex flex-col items-center bg-gray-50 rounded-xl p-4 border hover:shadow transition cursor-pointer"
							onClick={() => navigate("/browse-products", { state: { category: "fruit" } })}>
							<img src="/images/fruits.png" alt="Fruits" className="w-20 h-20 object-contain mb-2" />
							<span className="font-semibold">Fruits</span>
						</div>
						<div
							className="flex flex-col items-center bg-gray-50 rounded-xl p-4 border hover:shadow transition cursor-pointer"
							onClick={() => navigate("/browse-products", { state: { category: "grain" } })}>
							<img src="/images/grains.png" alt="Grains" className="w-20 h-20 object-contain mb-2" />
							<span className="font-semibold">Grains</span>
						</div>
						<div
							className="flex flex-col items-center bg-gray-50 rounded-xl p-4 border hover:shadow transition cursor-pointer"
							onClick={() => navigate("/browse-products", { state: { category: "meat" } })}>
							<img src="/images/meat.png" alt="Meat" className="w-20 h-20 object-contain mb-2" />
							<span className="font-semibold">Meat</span>
						</div>
					</div>
				</div>
			</section>

			<section className="py-7">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-2xl sm:text-3xl font-bold mb-2">Built for Farmers & Sellers</h2>
					<p className="text-gray-600 mb-8 text-base sm:text-lg">
						Our platform provides special tools for both farmers looking to sell fresher produce and for
						sellers seeking the highest margin at competitive prices.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
						<div>
							<h3 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
								For Farmers
							</h3>
							<ul className="space-y-3 text-gray-700">
								<li className="flex items-start gap-2">
									<span className="text-green-600">✔</span> List Your Produce
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600">✔</span> Fair Pricing
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600">✔</span> Direct Communication
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
								For Sellers
							</h3>
							<ul className="space-y-3 text-gray-700">
								<li className="flex items-start gap-2">
									<span className="text-green-600">✔</span> Browse Fresh Produce
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600">✔</span> Location-Based Search
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600">✔</span> Order Tracking
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="py-7 border-t">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">How it Works</h2>
					<p className="text-gray-600 text-center mb-8 text-base sm:text-lg">
						Getting started with Farm2Market is simple. Follow these four easy steps to start buying or
						selling fresh produce.
					</p>
					<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
						<div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center border">
							<div className="w-12 h-12 mb-3 flex items-center justify-center bg-green-100 rounded-full text-green-700 text-2xl">
								1
							</div>
							<div className="font-semibold mb-1">Sign Up</div>
							<div className="text-sm text-gray-600">
								Create your account, add your details, and set preferences.
							</div>
						</div>
						<div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center border">
							<div className="w-12 h-12 mb-3 flex items-center justify-center bg-green-100 rounded-full text-green-700 text-2xl">
								2
							</div>
							<div className="font-semibold mb-1">List or Browse</div>
							<div className="text-sm text-gray-600">
								Farmers list products, sellers can browse and purchase.
							</div>
						</div>
						<div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center border">
							<div className="w-12 h-12 mb-3 flex items-center justify-center bg-green-100 rounded-full text-green-700 text-2xl">
								3
							</div>
							<div className="font-semibold mb-1">Connect & Negotiate</div>
							<div className="text-sm text-gray-600">
								Message, negotiate, and agree on pricing and delivery.
							</div>
						</div>
						<div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center border">
							<div className="w-12 h-12 mb-3 flex items-center justify-center bg-green-100 rounded-full text-green-700 text-2xl">
								4
							</div>
							<div className="font-semibold mb-1">Complete Transaction</div>
							<div className="text-sm text-gray-600">
								Accept delivery or pickup, and complete payment securely.
							</div>
						</div>
					</div>
					{!token && (
						<div className="flex justify-center">
							<button
								type="button"
								onClick={() => navigate("/login")}
								className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition">
								Get Started Today
							</button>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
